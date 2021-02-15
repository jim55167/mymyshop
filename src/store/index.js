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
      console.log(context)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.dispatch('updateLoading', true)
      axios.get(api).then((response) => {
        console.log(response)
        if (response.data.data.carts) {
          context.commit('CART', response.data.data)
        }
        context.dispatch('updateLoading', false)
      })
    }
    // removeCartItem (context, id) {
    //   const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
    //   context.dispatch('updateLoading', true)
    //   axios.delete(api).then((res) => {
    //     console.log(res)
    //     context.dispatch('updateLoading', false)
    //     context.dispatch('getCart')
    //   })
    // }
  }
})
