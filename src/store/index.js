import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    products: [],
    cart: {
      carts: []
    }
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    PRODUCTS (state, payload) {
      state.products = payload
    },
    CART (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    getAllProducts (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      context.dispatch('updateLoading', true)
      axios.get(api).then((response) => {
        context.commit('PRODUCTS', response.data.products)
        context.dispatch('updateLoading', false)
      })
    },
    getCart (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.dispatch('updateLoading', true)
      axios.get(api).then((response) => {
        if (response.data.data.carts) {
          context.commit('CART', response.data.data)
          console.log(response.data.data.carts)
        }
        context.dispatch('updateLoading', false)
      })
    }
  }
})
