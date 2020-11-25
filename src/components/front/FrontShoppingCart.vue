<template>
  <div class="row justify-content-center">
    <loading :active.sync="isLoading"></loading>

    <div class="container mt-4" v-if="cartHasItem">
      <div class="cart-wrap">
        <div class="shopping-step mb-4">
          <div class="step" :class="{'active-step' : activedPage == 'FrontCartItems'}">
            <h5>CHECK CART</h5>
          </div>
          <div class="step" :class="{'active-step' : activedPage == 'FrontOrder'}">
            <h5>FILL INFO</h5>
          </div>
          <div class="step" :class="{'active-step' : activedPage == 'FrontCheckout'}">
            <h5>PAYMENT LIST</h5>
          </div>
        </div>

        <router-view></router-view>
      </div>
    </div>

    <div class="emptyCart-wrap" v-if="!cartHasItem">
      <h4>SHOPPING CART IS EMPTY</h4>
      <router-link class="btn btn-primary shopping-link" to="/frontProducts/all">SHOPPING NOW!</router-link>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isLoading: false,
      cart: [],
      couponCode: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      activePage: this.$route.name
    };
  },

  methods: {
    getCart() {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      this.isloading = true;
      this.$http.get(url).then((response) => {
        this.cart = response.data.data;
        console.log(response);  
         this.isloading = false;
      });
    },
  },

  computed: {
    activedPage() {
      return this.$route.name;
    },

    cartHasItem() {
      if (this.cart.carts == undefined) {
        return;
      } else {
        if (this.cart.carts.length == 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  },

  created() {
    this.getCart();
  }
};
</script>