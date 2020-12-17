<template>
    <div>
        <Loading :active.sync="isLoading"></Loading>  
        <swiper></swiper>
        
        <div class="home-banner-a">
          <router-link href="#" to="/girls_unique">
            <div class="home-box">
              <div class="home-box-flex">
                <div class="home-box-img1"></div>
                <div class="home-box-img2"></div>
              </div>
              <div class="home-box-center">
                <div class="home-box-img3"></div>
                <a>-<br/>
                RECOMMEND ITEM<br/>
                SPECIAL AND ENTIRELY WORTH IT
                </a>
              </div>
            </div>
          </router-link>
        </div>
        <div class="home-banner-b">
          <router-link href="#" to="/girls_unique">
            <div class="home-box">
              <div class="home-box-nav">
                <div class="home-box-left">
                  <div class="home-box-img1"></div>
                </div>
                <div class="home-box-right">
                  <div class="home-box-img2"></div>
                </div>
              </div>
              <div class="home-box-bottom">
                <div class="home-box-img3"></div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="home-banner-c">
          <router-link href="#" to="/girls_unique">
            <div class="home-box">
              <div class="home-box-top">
                <div class="home-box-img1"></div>
              </div>
              <div class="home-box-flex">
                <div class="home-box-left-nav">
                  <div class="home-box-img2"></div>
                  <i>Wake me up when my breakfast is done.
                    I want a glass of honey milk,
                    three piece of butter jam toast
                    and milk
                    table under sunlight.
                  </i>
                </div>
                <div class="home-box-img3"></div>
              </div>
            </div>
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
                <img src="~@/assets/calendar/Store1.jpg">
              </router-link>
            </div>
            <div class="home-app">
              <router-link href="#" to="/home">
                <img src="~@/assets/calendar/APP1.jpg">
              </router-link>
            </div>
            <div class="home-ig">
              <router-link href="#" to="/home">
                <img src="~@/assets/calendar/IG1.jpg">
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