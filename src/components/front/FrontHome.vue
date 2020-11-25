<template>
    <div>
        <loading :active.sync="isLoading"></loading>  
        <swiper></swiper>
        <div class="home">
            <div class="home-gif">
              <a href="#" target="_blank">
                <img src="~@/assets/calendar/g1.jpg">
              </a>
            </div>
            <div class="home-gif">
              <a href="#" target="_blank">
                <img src="~@/assets/calendar/g2.jpg">
              </a>
            </div>
            <div class="home-gif">
              <a href="#" target="_blank">
                <img src="~@/assets/calendar/g3.jpg">
              </a>
            </div>
            <div class="home-gif">
              <a href="#" target="_blank">
                <img src="~@/assets/calendar/g4.jpg">
              </a>
            </div>
        </div>
        <div class="home-banner1">
            <a href="#" target="_blank">
                <img src="~@/assets/calendar/B1.jpg">
            </a>
        </div>
        <div class="home-banner2">
            <a href="#" target="_blank">
                <img src="~@/assets/calendar/B2.jpg">
                <img src="~@/assets/calendar/B3.jpg">
            </a>
        </div>
        <div class="home-banner3">
            <a href="#" target="_blank">
                <img src="~@/assets/calendar/B4.jpg">
            </a>
        </div>
        <div class="home-banner4">
            <a href="#" target="_blank">
                <img src="~@/assets/calendar/B5.jpg">
            </a>
        </div>
        <div class="home-banner5">
            <a href="#" target="_blank">
                <img src="~@/assets/calendar/B6.jpg">
            </a>
        </div>
        <div class="home-footer">
            <div class="footer-img">
              <a href="#" target="_blank">
                  <img src="~@/assets/calendar/F1.jpg">
              </a>
            </div>
            <div class="footer-img">
              <a href="#" target="_blank">
                  <img src="~@/assets/calendar/F2.jpg">
              </a>
            </div>
            <div class="footer-img">
              <a href="#" target="_blank">
                  <img src="~@/assets/calendar/F3.jpg">
              </a>
            </div>
            <div class="footer-img">
              <a href="#" target="_blank">
                  <img src="~@/assets/calendar/F4.jpg">
              </a>
            </div>
        </div>
        <div class="app">
            <div class="home-store">
              <a href="#" target="_blank">
                <img src="~@/assets/calendar/Store.jpg">
              </a>
            </div>
            <div class="home-app">
              <a href="#" target="_blank">
                <img src="~@/assets/calendar/APP.jpg">
              </a>
            </div>
            <div class="home-ig">
              <a href="#" target="_blank">
                <img src="~@/assets/calendar/IG.jpg">
              </a>
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