<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top">
      <router-link class="navbar-logo" to="/home">
        <span style="font-size: 1.5rem;">
          <i class="fab fa-asymmetrik"></i>MyMyShop
        </span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav align-items-center mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" style="color: yellow" to="/admin/products">PRODUCT LIST</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" style="color: yellow" to="/admin/orders">ORDER LIST</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" style="color: yellow" to="/admin/coupons">COUPON LIST</router-link>
          </li>
        </ul>

        <ul class="navbar-nav align-items-center ml-3">
          <li>
            <a class="text-light-danger nav-link mr-2" href="#"
               v-if="is_login" @click="signOut" style="color:orange;">
              SIGN OUT
              <i class="fas fa-sign-out-alt ml-1"></i>
            </a>
            <router-link class="nav-link mr-2" to="/login" v-else
             style="color:orange;">
              SIGN IN
              <i class="fas fa-sign-in-alt ml-1"></i>
            </router-link>
          </li>
          <li>
            <router-link class="nav-link mr-2" to="/home" v-if="is_login"
             style="color:pink;">
              FRONT END
              <i class="fas fa-store-alt ml-1"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_login: false
    };
  },

  methods: {
    checkLoginStatus() {
      const api = `${process.env.APIPATH}/api/user/check`;
      this.$http.post(api).then(response => {
        this.is_login = response.data.success;
      });
    },

    signOut() {
      const api = `${process.env.APIPATH}/logout`;
      this.$http.post(api).then(response => {
        if (response.data.success) {
          this.is_login = false;
          this.$router.push("/home");
        }
      });
    }
  },

  created() {
    this.checkLoginStatus();
  }
};
</script>

