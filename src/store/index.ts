import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import { mean, sortBy, groupBy, filter, find, reject, clone, toPairs } from 'lodash'
import { RootState, Review, Filter } from '@/types'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  plugins: [createPersistedState({ storage: window.localStorage })],
  state: {
    loading: false,
    error: null,
    reviews: [],
    openedFilter: '',
    filters: [],
    pagination: {
      itemsPerPage: 12,
      page: 1
    }
  },
  mutations: {
    SET_LOADING (state, status: boolean) {
      state.loading = status
    },
    SET_ERROR (state, error: any) {
      state.error = error
    },
    SET_REVIEWS (state, reviews: Review[]) {
      state.reviews = reviews
    },
    SET_OPENDED_FILTER (state, parameter: string) {
      state.openedFilter = parameter
    },
    SET_FILTER (state, filter: Filter) {
      const sameParameterFilterFounded = find(state.filters, { parameter: filter.parameter })
      const filterFounded = find(state.filters, filter)

      if (sameParameterFilterFounded) {
        state.filters = reject(state.filters, sameParameterFilterFounded)
      }

      if (filterFounded) {
        state.filters = reject(state.filters, filter)
      } else {
        state.filters.push(filter)
      }
    },
    SET_PAGINATION_PAGE (state, page: number) {
      state.pagination.page = page
    }
  },
  getters: {
    filteredReviews: state => (itemsPerPage: number, page: number) => {
      const reviews = sortBy(state.reviews, 'date').reverse()

      let filteredReviews = reviews

      if (state.filters.length > 0) {
        for (const selectedFilter of state.filters) {
          filteredReviews = filter(filteredReviews, { [selectedFilter.parameter]: selectedFilter.value })
        }
      }

      if (itemsPerPage && page) {
        return filteredReviews.slice(itemsPerPage * page - (itemsPerPage - 1) - 1, itemsPerPage * page)
      } else {
        return filteredReviews
      }
    },
    latestNegativeReviews: state => (items: number) => {
      const latestNegativeReviews = filter(state.reviews, { sentiment: 'Negativo' }).reverse()

      return latestNegativeReviews.slice(0, items)
    },
    averageScore: state => {
      const scores = []

      for (const review of state.reviews) {
        scores.push(review.score)
      }

      const averageScore = mean(scores)

      return averageScore.toFixed(1)
    },
    reviewsDailyConsolidations: state => {
      const reviewsDailyConsolidations = []

      for (const [date, reviews] of toPairs(groupBy(state.reviews, 'date'))) {
        const scores = []

        for (const review of reviews) {
          scores.push(review.score)
        }

        const averageScore = mean(scores)

        reviewsDailyConsolidations.push({
          date: date,
          totalReviews: reviews.length,
          averageScore: averageScore.toFixed(2)
        })
      }

      return reviewsDailyConsolidations
    },
    totalSentimentsDailySeries: state => {
      const totalSentimentsDaily = []

      for (const sentiment of ['Positivo', 'Neutro', 'Negativo']) {
        totalSentimentsDaily.push({
          name: sentiment,
          data: []
        })

        for (const [date, reviews] of toPairs(groupBy(state.reviews, 'date'))) {
          const objIndex = totalSentimentsDaily.findIndex(obj => obj.name === sentiment)

          const filteredReviewsLength = filter(state.reviews, { date: date, sentiment: sentiment }).length
          totalSentimentsDaily[objIndex].data.push(filteredReviewsLength)
        }
      }

      return totalSentimentsDaily
    },
    totalReviewsByScoreSeries: state => {
      const totalReviewsByScore = []

      for (const score of [5, 4, 3, 2, 1]) {
        totalReviewsByScore.push({
          x: score.toString(),
          y: filter(state.reviews, { score: score }).length
        })
      }

      return [{ data: totalReviewsByScore }]
    },
    totalReviewsBySentimentSeries: state => {
      const totalReviewsBySentiment = []

      for (const sentiment of ['Positivo', 'Neutro', 'Negativo']) {
        totalReviewsBySentiment.push({
          x: sentiment,
          y: filter(state.reviews, { sentiment: sentiment }).length
        })
      }

      return [{ data: totalReviewsBySentiment }]
    },
    totalSentimentsBySourceSeries: state => {
      const totalSentimentsBySource = []

      for (const sentiment of ['Positivo', 'Neutro', 'Negativo']) {
        totalSentimentsBySource.push({
          name: sentiment,
          data: []
        })

        for (const [source] of toPairs(groupBy(state.reviews, 'source'))) {
          const objIndex = totalSentimentsBySource.findIndex(obj => obj.name === sentiment)

          totalSentimentsBySource[objIndex].data.push(filter(state.reviews, { sentiment: sentiment, source: source }).length)
        }
      }

      return totalSentimentsBySource
    },
    totalSentimentsByGenderSeries: state => {
      const totalSentimentsByGender = []

      for (const sentiment of ['Positivo', 'Neutro', 'Negativo']) {
        console.log(sentiment)
        totalSentimentsByGender.push({
          name: sentiment,
          data: []
        })

        for (const [gender] of toPairs(groupBy(state.reviews, 'gender'))) {
          const objIndex = totalSentimentsByGender.findIndex(obj => obj.name === sentiment)

          totalSentimentsByGender[objIndex].data.push(filter(state.reviews, { sentiment: sentiment, gender: gender }).length)
        }
      }

      return totalSentimentsByGender
    },
    categoriesBySentiment: state => (sentiment: string) => {
      const categories = []

      for (const review of filter(state.reviews, { sentiment: sentiment })) {
        for (const category of review.categories) {
          categories.push(category)
        }
      }

      const categoriesBySentiment = []

      for (const [category, values] of toPairs(groupBy(categories))) {
        categoriesBySentiment.push({
          name: category,
          value: values.length
        })
      }

      return categoriesBySentiment
    }
  },
  actions: {
    async fetchReviews ({ commit }) {
      try {
        commit('SET_LOADING', true)

        const res = await axios.get('https://s3.amazonaws.com/files.harmo.me/reviews_test.json')

        // Only categories come unparsed. Maybe stringfied twice.
        // This is a fix (in real life this fix should be done in the backend):
        const reviews = res.data.map((review: Review) => {
          return {
            categories: JSON.parse(clone(review.categories)),
            date: review.date,
            gender: review.gender,
            language: review.language,
            reviewer: review.reviewer,
            score: review.score,
            sentiment: review.sentiment,
            source: review.source,
            text: review.text
          }
        })

        console.log(reviews)

        commit('SET_REVIEWS', reviews)
      } catch (error) {
        console.error(error)
        commit('SET_ERROR', {
          status: true,
          message: error
        })
      } finally {
        commit('SET_LOADING', false)
      }
    },
    previousPage ({ state, commit }) {
      if (state.pagination.page > 1) {
        commit('SET_PAGINATION_PAGE', state.pagination.page - 1)
      }
    },
    nextPage ({ state, getters, commit }) {
      if (getters.filteredReviews(0, 0).length > state.pagination.itemsPerPage * state.pagination.page) {
        commit('SET_PAGINATION_PAGE', state.pagination.page + 1)
      }
    }
  }
}

export default new Vuex.Store<RootState>(store)
