<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="banner_open_line">
      <a href="https://line.me/ti/p/dKAzJfqWhb"
        ><img alt="line" src="~@/assets/calendar/LINEAPP.png"
      /></a>
    </div>
    <div class="banner_open_shoppingcart">
      <router-link to="/shopping_cart/front_cart_items">
        <span class="badge">{{ cart.carts.length }}</span>
        <img alt="購物車" src="~@/assets/calendar/shoppingCart.jpg" />
      </router-link>
    </div>
    <div class="swiper-slide games">
      <img
        src="~@/assets/calendar/MORESTYLE.jpg"
        alt="Banner"
      />
    </div>
    <div class="row">
      <div class="bg">
        <div class="content">
          <div class="h6 content-nav">
            全部商品
          </div>
          <ul class="girl clearfix">
            <li
              v-for="(item, key) in products.slice(
                pageStart,
                pageStart + countPage
              )"
              :key="key"
            >
              <a href="#" @click.prevent="getProduct(item.id)" target="_parent">
                <div
                  class="bodycard"
                  :style="{backgroundImage: `url(${item.imageUrl})`}"
                ></div>
                <div class="overlay-girl">
                  <h1>{{ item.title }}</h1>
                  <div class="align-items-baseline">
                    <del class="h6" v-if="item.price"
                      >原價 {{ item.origin_price | currency }} 元</del
                    >
                    <div class="h5" v-if="item.price">
                      優惠價 {{ item.price | currency }} 元
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- bootstrap pagination -->
    <div class="page-box">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: current_page === 1 }">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click.prevent="getPage(current_page - 1)"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            class="page-item"
            v-for="page in totalPage"
            :key="page"
            :class="{ active: current_page === page }"
          >
            <a class="page-link" href="#" @click.prevent="getPage(page)">{{ page }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: current_page === totalPage }"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click.prevent="getPage(current_page + 1)"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    <GoTop></GoTop>
  </div>
  </div>
</template>

<script>

import GoTop from '@/components/GoTop'
import $ from 'jquery'

export default {
  data () {
    return {
      current_page: 1,
      countPage: 12
    }
  },
  methods: {
    getAllProducts () {
      this.$store.dispatch('getAllProducts')
    },
    getProduct (id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      this.$store.dispatch('updateLoading', true)
      localStorage.setItem('filteredList', JSON.stringify(this.products))
      this.$http.get(url).then(response => {
        if (response.data.success) {
          this.$store.dispatch('updateLoading', false)
          this.$router.push(
            `../front_single_product/${response.data.product.id}`
          )
        }
      })
    },
    getPage (page) {
      $('html, body').animate({ scrollTop: 0 }, 600)
      if (page <= 0 || page > this.totalPage) {
        return
      }
      this.current_page = page
    },
    getCart () {
      this.$store.dispatch('getCart')
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    cart () {
      return this.$store.state.cart
    },
    pageStart () {
      return (this.current_page - 1) * this.countPage
    },
    totalPage () {
      return Math.ceil(this.products.length / this.countPage)
    }
  },
  created () {
    this.getAllProducts()
  },
  components: {
    GoTop
  }
}
</script>
