import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reviews: []
  },
  mutations: {
    SET_REVIEWS (state, payload) {
      state.reviews = payload
    }
  },
  actions: {
    async fetchData ({ commit }) {
      try {
        const res = await axios.get('https://s3.amazonaws.com/files.harmo.me/reviews_test.json')

        console.log(res.data)

        commit('SET_REVIEWS', res.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
