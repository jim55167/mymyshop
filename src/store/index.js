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
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      context.commit('LOADING', true)
      axios.get(url).then((response) => {
        context.commit('PRODUCTS', response.data.products)
        context.commit('LOADING', false)
      })
    },
    updateCart (context, {
      cartItemId,
      productId,
      qty
    }) {
      const deleteapi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cartItemId} `
      const addapi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: productId,
        qty
      }
      context.commit('LOADING', true)
      axios.delete(deleteapi).then((response) => {
        if (response.data.success) {
          axios.post(addapi, {
            data: cart
          }).then(() => {
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
        context.commit('LOADING', true)
        axios.get(api).then((response) => {
          if (response.data.data.carts) {
            context.commit('CART', response.data.data)
            resolve(response.data.data.carts)
          }
          context.commit('LOADING', false)
        })
      })
    },
    removeCartItem (context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('LOADING', true)
      axios.delete(api).then(() => {
        context.commit('LOADING', false)
        context.dispatch('getCart')
      })
    }
    // addToCart (context, {
    //   id,
    //   qty
    // }) {
    //   const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
    //   context.commit('LOADING', true)
    //   const cart = {
    //     product_id: id,
    //     qty
    //   }
    //   axios.post(api, {
    //     data: cart
    //   }).then(() => {
    //     context.commit('LOADING', false)
    //     context.dispatch('getCart')
    //     context.$emit('cartQty', qty)
    //   })
    // }
  },
  modules: {}
})
