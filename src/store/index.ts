import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { groupBy } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    error: {
      status: false,
      message: null
    },
    reviews: []
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
    }
  },
  getters: {
    averageScore: state => {
      if (state.reviews.length > 0) {
        const averageScore = state.reviews.reduce((prev, curr) => prev + curr.score, 0) / state.reviews.length

        return averageScore.toFixed(1)
      } else {
        return 0
      }
    },
    groupReviews: state => (parameter: string) => {
      console.log(Object.entries(groupBy(state.reviews, parameter)))
      return Object.entries(groupBy(state.reviews, parameter))
    },
    reviewsDailyValues: (state, getters) => {
      const reviewsDailyValues = []

      for (const date of getters.groupReviews('date')) {
        const reviewsThisDate = date[1]

        const averageScore = reviewsThisDate.reduce((prev, curr) => prev + curr.score, 0) / reviewsThisDate.length

        reviewsDailyValues.push({
          date: date[0],
          totalReviews: reviewsThisDate.length,
          averageScore: averageScore.toFixed(2)
        })
      }

      return reviewsDailyValues
    },
    totalReviewsByScore: state => {
      if (state.reviews.length > 0) {
        const totalReviewsByScore = state.reviews.map(review => review.score).reduce((scores, star) => {
          if (star in scores) {
            scores[star]++
          } else {
            scores[star] = 1
          }

          return scores
        }, {})

        return Object.values(totalReviewsByScore).reverse()
      } else {
        return 0
      }
    },
    latestReviews: state => {
      if (state.reviews.length > 0) {
        const sortedReviewsByDate = state.reviews.sort((a, b) => b.date - a.date)

        const latestReviews = sortedReviewsByDate.slice(Math.max(state.reviews.length - 5, 1))

        return latestReviews.reverse()
      } else {
        return []
      }
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
    }
  }
})
