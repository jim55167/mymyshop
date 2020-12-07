<template>
    <div>
        <Loading :active.sync="isLoading"></Loading>  
        <swiper></swiper>
        <div class="home">
            <div class="home-gif">
              <router-link href="#" to="/girls_unique">
                <img src="~@/assets/calendar/g1.jpg">
              </router-link>
            </div>
            <div class="home-gif">
              <router-link href="#" to="/girls_unique">
                <img src="~@/assets/calendar/g2.jpg">
              </router-link>
            </div>
            <div class="home-gif">
              <router-link href="#" to="/girls_unique">
                <img src="~@/assets/calendar/g3.jpg">
              </router-link>
            </div>
            <div class="home-gif">
              <router-link href="#" to="/girls_unique">
                <img src="~@/assets/calendar/g4.jpg">
              </router-link>
            </div>
        </div>
        <div class="home-banner1">
          <img src="~@/assets/calendar/Coupon.jpg">
        </div>
        <div class="home-banner1">
            <router-link href="#" to="/girls_unique">
                <img src="~@/assets/calendar/B1.jpg">
            </router-link>
        </div>
        <div class="home-banner2">
            <router-link href="#" to="/daze">
                <img src="~@/assets/calendar/B2.jpg">
                <img src="~@/assets/calendar/B3.jpg">
            </router-link>
        </div>
        <div class="home-banner3">
            <router-link href="#" to="/desinger">
                <img src="~@/assets/calendar/B4.jpg">
            </router-link>
        </div>
        <div class="home-banner4">
            <router-link href="#" to="/girls_unique">
                <img src="~@/assets/calendar/B5.jpg">
            </router-link>
        </div>
        <div class="home-banner5">
            <router-link href="#" to="/girls_unique">
                <img src="~@/assets/calendar/B6.jpg">
            </router-link>
        </div>
        <div class="home-footer">
            <div class="footer-img">
              <router-link href="#" to="/daze">
                  <img src="~@/assets/calendar/F1.jpg">
              </router-link>
            </div>
            <div class="footer-img">
              <router-link href="#" to="/desinger">
                  <img src="~@/assets/calendar/F2.jpg">
              </router-link>
            </div>
            <div class="footer-img">
              <router-link href="#" to="/normcore">
                  <img src="~@/assets/calendar/F3.jpg">
              </router-link>
            </div>
            <div class="footer-img">
              <router-link href="#" to="/bt21">
                  <img src="~@/assets/calendar/F4.jpg">
              </router-link>
            </div>
        </div>
        <div class="app">
            <div class="home-store">
              <router-link href="#" to="/home">
                <img src="~@/assets/calendar/Store.jpg">
              </router-link>
            </div>
            <div class="home-app">
              <router-link href="#" to="/home">
                <img src="~@/assets/calendar/APP.jpg">
              </router-link>
            </div>
            <div class="home-ig">
              <router-link href="#" to="/home">
                <img src="~@/assets/calendar/IG.jpg">
              </router-link>
            </div>
        </div>
      <GoTop></GoTop>
    </div>
</template>

<script>

import $ from 'jquery';
import Swiper from '../Swiper';
import GoTop from '../GoTop';

export default {
    data() {
        return{
            products: [],
            isLoading: false,
        }       
    },
    components: {
    Swiper,
    GoTop
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`; //'https://vue-course-api.hexschool.io/api/jim55167/products'
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.isLoading = false;
        this.products = response.data.products;
      });
    },
  },
  created() {
    this.getProducts();  
  },
}
</script>