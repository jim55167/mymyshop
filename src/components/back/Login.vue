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
            placeholder="Email address"
            required
            autofocus
          />
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword "
            class="form-control mb-3"
            v-model="user.password"
            placeholder="Password"
            required
          />
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
        username: "",
        password: "",
      },
      isLoading: false,
    };
  },
  methods: {
    signin() {
      const api = `${process.env.APIPATH}/admin/signin`;
      this.isLoading = true;
      // API 伺服器路徑
      //所申請的 APIPath
      this.$http.post(api, this.user).then((response) => {
        this.isLoading = false;
        if (response.data.success) {
          const token = response.data.token;
          const expired = response.data.expired;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          this.$router.push("/home");
        }
      });
    },
  },
};
</script>
