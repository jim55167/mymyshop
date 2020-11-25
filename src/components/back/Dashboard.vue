<template>
  <div style="font-size:.875rem;">
    <Navbar></Navbar>
    <div class="container-fluid">
      <div class="row">
        <main role="main" class="ml-sm-auto col-lg-10 px-md-4" style="margin:75px auto 20px;">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";

export default {
  components: {
    Navbar,
  },
  created(){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${token}`;
  }
};
</script>
