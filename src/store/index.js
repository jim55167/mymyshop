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
    updateCart (context, { id, productId, qty }) {
      const deleteapi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      const addapi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: productId,
        qty
      }
      context.dispatch('updateLoading', true)
      axios.delete(deleteapi).then(response => {
        if (response.data.success) {
          axios.post(addapi, { data: cart }).then(response => {
            if (response.data.success) {
              context.dispatch('getCart')
            }
          })
        }
      })
    },
    getCart (context) {
      return new Promise((resolve) => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        context.dispatch('updateLoading', true)
        axios.get(api).then((response) => {
          if (response.data.data.carts) {
            context.commit('CART', response.data.data)
            resolve(response.data.data.carts)
          }
          context.dispatch('updateLoading', false)
        })
      })
    },
    removeCart (context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.dispatch('updateLoading', true)
      axios.delete(api).then(() => {
        context.dispatch('updateLoading', false)
        context.dispatch('getCart')
      })
    }
  }
})
