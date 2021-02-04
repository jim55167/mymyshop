import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    products: [],
    myShoppingCart: JSON.parse(localStorage.getItem('myCart')) || [],
    cart: {
      carts: []
    },
    quantity: 0,
    itemId: '',
    addProducts: false
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
    },
    ADDTOCART (state, payload) {
      state.cart.carts.filter((item) => {
        console.log(payload.qty, item.qty)
        if (item.product_id === payload.id) {
          state.itemId = item.id
          state.addProducts = true
          state.quantity = payload.qty + item.qty
        }
      })
    },
    SETCART (state, id) {
      state.myShoppingCart.findIndex((response) => {
        return id === response
      })
      if (state.myShoppingCart.indexOf(id) < 0) {
        state.myShoppingCart.push(id)
        console.log(state.myShoppingCart)
      }
      localStorage.setItem('myCart', JSON.stringify(state.myShoppingCart))
    }
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    getAllProducts (context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      context.dispatch('updateLoading', true)
      axios.get(url).then((response) => {
        context.commit('PRODUCTS', response.data.products)
        context.dispatch('updateLoading', false)
      })
    },
    addToCart (context, { id, qty }) {
      context.dispatch('updateLoading', true)
      context.dispatch('getCart')
      context.commit('ADDTOCART', { id: id, qty: qty })
      if (context.state.addProducts) {
        const deleteApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${context.state.itemId} `
        const addApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        const cart = {
          product_id: id,
          qty: context.state.quantity
        }
        context.commit('SETCART', { product_id: id, qty: qty })
        axios.delete(deleteApi).then((test) => {
          return axios.post(addApi, { data: cart })
        }).then((item) => {
          console.log(item.data.data)
          context.dispatch('getCart')
          context.dispatch('updateLoading', false)
        })
      } else {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        const cartItem = {
          product_id: id,
          qty
        }
        context.commit('SETCART', { product_id: id, qty: qty })
        axios.post(api, { data: cartItem }).then((response) => {
          if (response.data.success) {
            context.dispatch('getCart')
            context.dispatch('updateLoading', false)
          }
        })
      }
    },
    getCart (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.dispatch('updateLoading', true)
      axios.get(api).then((response) => {
        if (response.data.data.carts) {
          context.commit('CART', response.data.data)
        }
        context.dispatch('updateLoading', false)
      })
    },
    removeCartItem (context, id) {
      console.log(id)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.dispatch('updateLoading', true)
      axios.delete(api).then(() => {
        context.dispatch('updateLoading', false)
        context.dispatch('getCart')
      })
    }
  }
})
