import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import { mean, sortBy, groupBy, filter, reject, uniq } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ storage: window.localStorage })],
  state: {
    loading: false,
    error: {
      status: false,
      message: null
    },
    reviews: [],
    openedFilter: null,
    filters: [],
    pagination: {
      itemsPerPage: 12,
      page: 1
    }
  },
  mutations: {
    SET_LOADING (state, payload) {
      state.loading = payload
    },
    SET_ERROR (state, payload) {
      state.error = payload
    },
    SET_REVIEWS (state, payload) {
      state.reviews = payload
    },
    SET_OPENDED_FILTER (state, payload) {
      state.openedFilter = payload
    },
    SET_FILTER (state, payload) {
      const sameParameterFilterFounded = state.filters.find(filter => filter.parameter === payload.parameter)
      const filterFounded = state.filters.find(filter => filter === payload)

      if (sameParameterFilterFounded) {
        state.filters = reject(state.filters, sameParameterFilterFounded)
      }

      if (filterFounded !== undefined) {
        state.filters = reject(state.filters, payload)
      } else {
        state.filters.push(payload)
      }
    },
    SET_PAGINATION_PAGE (state, payload) {
      state.pagination.page = payload
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

      for (const date of Object.entries(groupBy(state.reviews, 'date'))) {
        const reviewsOnThisDate = date[1]

        const scores = []

        for (const review of reviewsOnThisDate) {
          scores.push(review.score)
        }

        const averageScore = mean(scores)

        reviewsDailyConsolidations.push({
          date: date[0],
          totalReviews: reviewsOnThisDate.length,
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

        for (const date of Object.entries(groupBy(state.reviews, 'date'))) {
          const objIndex = totalSentimentsDaily.findIndex(obj => obj.name === sentiment)

          totalSentimentsDaily[objIndex].data.push(filter(state.reviews, { sentiment: sentiment, date: date[0] }).length)
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

        for (const source of ['Google', 'Facebook']) {
          const objIndex = totalSentimentsBySource.findIndex(obj => obj.name === sentiment)

          totalSentimentsBySource[objIndex].data.push(filter(state.reviews, { sentiment: sentiment, source: source }).length)
        }
      }

      return totalSentimentsBySource
    },
    totalSentimentsByGenderSeries: state => {
      const totalSentimentsByGender = []

      for (const sentiment of ['Positivo', 'Neutro', 'Negativo']) {
        totalSentimentsByGender.push({
          name: sentiment,
          data: []
        })

        for (const gender of ['male', 'female']) {
          const objIndex = totalSentimentsByGender.findIndex(obj => obj.name === sentiment)

          totalSentimentsByGender[objIndex].data.push(filter(state.reviews, { sentiment: sentiment, gender: gender }).length)
        }
      }

      return totalSentimentsByGender
    },
    totalCategories: state => {
      const categories = []

      for (const review of state.reviews) {
        for (const category of review.categories) {
          categories.push(category)
        }
      }

      console.log(uniq(categories))
      console.log(groupBy(categories))

      return groupBy(categories)
    }
  },
  actions: {
    async fetchReviews ({ commit }) {
      try {
        commit('SET_LOADING', true)

        const res = await axios.get('https://s3.amazonaws.com/files.harmo.me/reviews_test.json')

        // Only categories come unparsed. Maybe stringfied twice.
        // This is a fix (in real life this fix should be done in the backend):
        const reviews = res.data.map(review => {
          return {
            categories: JSON.parse(review.categories),
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
})
