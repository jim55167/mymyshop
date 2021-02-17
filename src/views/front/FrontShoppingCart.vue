<template>
  <div class="row justify-content-center">
    <Loading :active.sync="isLoading"></Loading>

    <div class="container mt-4" v-if="myShoppingcart.length > 0">
      <div class="cart-wrap">
        <div class="shopping-step mb-4">
          <div class="step" :class="{ 'active-step' : activedPage == 'FrontCartItems' }">
            <h5>確認商品</h5>
          </div>
          <div class="step" :class="{ 'active-step' : activedPage == 'FrontOrder' }">
            <h5>填寫訂單</h5>
          </div>
          <div class="step" :class="{ 'active-step' : activedPage == 'FrontCheckout' }">
            <h5>確認付款</h5>
          </div>
        </div>

        <router-view></router-view>
      </div>
    </div>

    <div class="emptyCart-wrap" v-else>
      <h4>購物車是空的</h4>
      <router-link class="btn btn-primary shopping-link" to="/home">返回購物!</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      couponCode: '',
      myShoppingcart: JSON.parse(localStorage.getItem('myCart')),
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      activePage: this.$route.name
    }
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    activedPage () {
      return this.$route.name
    }
  },
  created () {
    this.getCart()
  }
}
</script>
