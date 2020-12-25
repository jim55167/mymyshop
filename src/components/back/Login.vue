<template>
  <div>
    <div class="login">
      <form class="form-wrap" @submit.prevent="signin">
        <div class="login-img">
          <div class="login-logo"></div>
        </div>

        <div class="login-content">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control mb-3"
            v-model="user.username"
            placeholder="email@example.com"
            required
            autofocus
          />
          <label for="inputPassword" class="sr-only">Password</label>
          <div class="password-wrap">
            <input
              :type="pwdType"
              id="inputPassword "
              class="form-control mb-3"
              v-model="user.password"
              placeholder="Password"
              @on-change="userPassword"
              required
            />
            <img :src= 'seen ? openEyes : closeEyes' @click="changeType">
          </div>
          <div class="checkbox mb-3">
            <label class="remember-text">
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            <i class="fas fa-circle-notch fa-spin" v-if="isLoading"></i> Sign in
          </button>
          <p class="mt-5 mb-3 text-muted">&copy; 2019-2021</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      seen: '',
      pwdType: 'password',
      userPassword: '',
      openEyes: require('@/assets/calendar/open.png'),
      closeEyes: require('@/assets/calendar/close.png'),
    };
  },
  methods: {
    signin() {
      const api = `${process.env.APIPATH}/admin/signin`;
      this.$store.dispatch('updateLoading',true);
      // API 伺服器路徑
      //所申請的 APIPath
      this.$http.post(api, this.user).then((response) => {
        this.$store.dispatch('updateLoading',false);
        if (response.data.success) {
          const token = response.data.token;
          const expired = response.data.expired;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          this.$router.push("/home");
        }
      });
    },
    changeType() {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
      this.seen = !this.seen;
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
};
</script>
