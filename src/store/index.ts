import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { sortBy, groupBy, filter, reject } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
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

      const r = groupBy(state.reviews, 'categories')
      console.log(r)

      return latestNegativeReviews.slice(0, items)
    },
    averageScore: state => {
      if (state.reviews.length > 0) {
        const averageScore = state.reviews.reduce((prev, curr) => prev + curr.score, 0) / state.reviews.length

        return averageScore.toFixed(1)
      } else {
        return 0
      }
    },
    groupReviews: state => (parameter: string) => {
      return Object.entries(groupBy(state.reviews, parameter))
    },
    reviewsDailyConsolidations: (state, getters) => {
      const reviewsDailyConsolidations = []

      for (const date of getters.groupReviews('date')) {
        const reviewsThisDate = date[1]

        const averageScore = reviewsThisDate.reduce((prev, curr) => prev + curr.score, 0) / reviewsThisDate.length

        reviewsDailyConsolidations.push({
          date: date[0],
          totalReviews: reviewsThisDate.length,
          averageScore: averageScore.toFixed(2)
        })
      }

      return reviewsDailyConsolidations
    },
    totalReviewsByScore: state => {
      const totalReviewsByScore = []

      for (const score of [5, 4, 3, 2, 1]) {
        totalReviewsByScore.push(filter(state.reviews, { score: score }).length)
      }

      return totalReviewsByScore
    }
  },
  actions: {
    async fetchReviews ({ commit }) {
      try {
        commit('SET_LOADING', true)

        const res = await axios.get('https://s3.amazonaws.com/files.harmo.me/reviews_test.json')

        console.log(res.data)

        commit('SET_REVIEWS', res.data)
      } catch (error) {
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
