<template>
  <div>
    <nav class="nav_bar">
        <div class="containers">
          <div class="nav_bar_box">
            <router-link class="nav-link logo" href="#" to="/admin/home"></router-link>
          </div>
            <ul class="menu-box" :class="{'menu-show': showMenu}">
              <li>
                <router-link class="nav-link" href="#" to="/morestyle">MORE STYLE</router-link>
              </li>
              <li>
                <router-link class="nav-link" href="#" to="/byleway">BYLEWAY</router-link>
              </li>
              <li>
                 <router-link class="nav-link" href="#" to="/lifestyle">LIFESTYLE</router-link>
              </li>
              <li>
                 <router-link class="nav-link" href="#" to="/bt21">BT21</router-link>
              </li>
              <li>
                <router-link class="nav-link" href="#" to="/normcore">NORMCORE</router-link>
              </li>
              <li>
                  <a class="text-light-danger nav-link mr-1" href="#" v-if="is_login" @click.prevent="signOut" to="/home">
                    SIGN OUT
                    <i class="fas fa-sign-out-alt ml-1"></i>
                  </a>
                  <router-link class="nav-link mr-2" to="/login" v-else>
                    SIGN IN
                    <i class="fas fa-sign-in-alt ml-1"></i>
                  </router-link>
              </li>
              <li class="menu-back"  v-if="is_login">
                <router-link class="nav-link" href="#" 
                 to="/admin/products">BACK END</router-link>
              </li>
            </ul>
          <div class="shoppingCart">
            <router-link class="nav-link" href="#" to="/shopping_cart/front_cart_items">
              <span class="badge">{{cart.carts.length}}</span>
              <i class="fas fa-cart-arrow-down" style="font-size: 35px; color:white; line-height:1.8;"></i>
            </router-link>
          </div>
          <a href="#" class="showmenu" @click.prevent="toggleClass"><img src="~@/assets/calendar/SHOWMENU.png"/></a>
        </div>
      </nav>
  </div>
</template>

<script>

import $ from "jquery";

export default {
  name: 'Navbar',
  data() {
    return {
        showMenu: false, 
        is_login: false,
    }
  },
  methods: {
    checkLoginStatus() {
      const api = `${process.env.APIPATH}/api/user/check`;
      this.$http.post(api).then(response => {
        this.is_login = response.data.success;
      });
    },
    signOut() {
      const url = `${process.env.APIPATH}/logout`; //登出的API路徑
      this.$http.post(url).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          this.is_login = false;
          this.$router.push('/home');
        }
      });
    },
    toggleClass() {
      this.showMenu = !this.showMenu;
    },
    getCart() {
      this.$store.dispatch('getCart');
    },
  },
  computed: {
  cart(){
    return this.$store.state.cart;
  },
},
  created() {
    this.checkLoginStatus();
    this.getCart();
}
}
</script>