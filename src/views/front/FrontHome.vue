<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <Swiper></Swiper>
    <div class="home-banner-a">
      <router-link to="/girls_unique">
        <div class="home-box">
          <div class="home-box-flex">
            <div class="home-box-img1"></div>
            <div class="home-box-img2"></div>
          </div>
          <div class="home-box-center">
            <div class="home-box-img3"></div>
            <p
              >-<br />
              RECOMMEND ITEM<br />
              SPECIAL AND ENTIRELY WORTH IT
            </p>
          </div>
        </div>
      </router-link>
    </div>
    <div class="home-winter-box">
      <div class="home-winter">
        <div class="home-winter-nav">
          <p class="home-winter-text">當冬日路過這個城市</p>
          <p class="home-winter-text text-nav">到處充滿著歡聚的氣息</p>
          <p class="home-winter-text text-nav2">此刻的喧鬧屬於我們</p>
        </div>
      </div>
    </div>
    <div class="home-banner-b">
      <router-link to="/girls_unique">
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
      <router-link to="/girls_unique">
        <div class="home-box">
          <div class="home-box-top">
            <div class="home-box-img1"></div>
          </div>
          <div class="home-box-flex">
            <div class="home-box-left-nav">
              <div class="home-box-img2"></div>
              <i
                >Wake me up when my breakfast is done. I want a glass of honey
                milk, three piece of butter jam toast and milk table under
                sunlight.
              </i>
            </div>
            <div class="home-box-img3"></div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="home-footer">
      <div class="footer-box">
        <div class="footer-nav">
          <router-link to="/daze">
            <div class="footer-img1"></div>
          </router-link>
          <router-link to="/desinger">
            <div class="footer-img2"></div>
          </router-link>
        </div>
        <div class="footer-nav">
          <router-link to="/normcore">
            <div class="footer-img3"></div>
          </router-link>
          <router-link to="/bt21">
            <div class="footer-img4"></div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="app">
      <div class="home-store">
        <router-link to="/home">
          <img alt="商店" src="~@/assets/calendar/Store1.jpg" />
        </router-link>
      </div>
      <div class="home-app">
        <router-link to="/home">
          <img alt="App" src="~@/assets/calendar/APP1.jpg" />
        </router-link>
      </div>
      <div class="home-ig">
        <router-link to="/home">
          <img alt="IG" src="~@/assets/calendar/IG1.jpg" />
        </router-link>
      </div>
    </div>
    <GoTop></GoTop>
  </div>
</template>

<script>

import Swiper from '@/components/Swiper'
import GoTop from '@/components/GoTop'

export default {
  data () {
    return {
      products: [],
      isLoading: false
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      this.isLoading = true
      this.$http.get(api).then(response => {
        this.isLoading = false
        this.products = response.data.products
      })
    }
  },
  created () {
    this.getProducts()
  },
  components: {
    Swiper,
    GoTop
  }
}
</script>
