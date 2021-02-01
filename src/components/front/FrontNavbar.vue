<template>
  <div>
    <nav class="nav_bar">
      <div class="containers">
        <div class="nav_bar_box">
          <router-link class="nav-link logo" to="/admin/home"></router-link>
        </div>
        <ul class="menu-box" :class="{ 'menu-show': showMenu }">
          <li>
            <router-link class="nav-link" to="/morestyle">MORE STYLE</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/byleway">BYLEWAY</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/lifestyle">LIFESTYLE</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/bt21">BT21</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/normcore">NORMCORE</router-link>
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
          <li class="menu-back" v-if="is_login">
            <router-link class="nav-link" href="#" to="/admin/products">BACK END</router-link>
          </li>
        </ul>
        <div class="shoppingCart">
          <router-link class="nav-link" to="/shopping_cart/front_cart_items">
            <span class="badge">{{ cart.carts.length }}</span>
            <i
              class="fas fa-cart-arrow-down"
            ></i>
          </router-link>
        </div>
        <a href="#" class="showmenu" @click.prevent="toggleClass"
          ><img alt="選單" src="~@/assets/calendar/SHOWMENU.png"
        /></a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'FrontNavbar',
  data () {
    return {
      showMenu: false,
      is_login: false
    }
  },
  methods: {
    checkLoginStatus () {
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
      this.$http.post(api).then((response) => {
        this.is_login = response.data.success
      })
    },
    signOut () {
      const url = `${process.env.VUE_APP_APIPATH}/logout`
      this.$http.post(url).then((response) => {
        if (response.data.success) {
          this.is_login = false
          this.$router.push('/home').catch(err => err)
        }
      })
    },
    toggleClass () {
      this.showMenu = !this.showMenu
    },
    getCart () {
      this.$store.dispatch('getCart')
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    }
  },
  created () {
    this.checkLoginStatus()
    this.getCart()
  }
}
</script>
