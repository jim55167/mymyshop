<template>
  <div class="fsp-container-fluid">
    <Loading :active.sync="isLoading"></Loading>
    <div class="banner_open_shoppingcart">
          <router-link to="/shopping_cart/front_cart_items">
            <span class="badge">{{ cart.carts.length }}</span>
            <img alt="購物車" src="~@/assets/calendar/shoppingCart.jpg"/>
          </router-link>
        </div>
    <div class="product-header">
      <div class="row justify-content-center">
        <div class="product-wrap col-12 col-md-6">
          <div class="product-img">
            <div class="abs-wrap">
              <img :src="product.imageUrl" alt="圖一" />
            </div>
          </div>
        </div>

        <div class="product-info col-12 col-md-6">
          <div class="product-title">
            <h2>
              {{ product.title }}
            </h2>
          </div>

          <div class="product-price d-flex justify-content-between align-items-baseline">
            <div class="h4 text-danger mb-0" v-if="!product.price">{{ product.origin_price | currency }}</div>
            <del class="h5 mb-0" v-if="product.price">{{ product.origin_price | currency }}</del>
            <div class="h4 text-danger mr-2 mb-0" v-if="product.price">{{ product.price | currency }}</div>
          </div>

          <pre class="product-content">{{ product.content }}</pre>

          <div class="product-input">
            <div class="quantity row">
              <span class="quantity-title">數量</span>
              <input type="button" class="btn btn-outline-third" @click="quantitySub(product)" value="-">
              <input type="text" :value="product.num" readonly="readonly" />
              <input type="button" class="btn btn-outline-third" @click="quantityPlus(product)" value="+">
            </div>

            <div class="buy-option">
              <input type="button" class="btn btn-primary mr-1percent" @click="addToCart(product.id, true, product.num)" value="馬上購買">
              <input type="button" class="btn btn-danger" @click="addToCart(product.id, false, product.num)" value="加入購物車">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="product-description">
      <div class="row my-3">
        <div class="description-title col-12">
          <h3>PRODUCT INFO</h3>
        </div>
        <div class="description-nav">
          <img :src="product.imageUrl3" alt="圖三" />
          <img :src="product.imageUrl2" alt="圖二" />
        </div>
        <div class="col-12">
          <pre>{{ product.description }}</pre>
        </div>
      </div>
    </div>

        <div class="recommand-products">
          <div class="row mb-3">
            <div class="recommand-title mt-1 mb-3 col-12">
              <h5>MAYBE YOU WILL LIKE...</h5>
            </div>
            <div class="col-md-3 col-sm-6 col-12 mb-4 recommand-hover"
              v-for="(item, index) in recommandProducts" :key="index">
              <a class="link-block" href="#"
                @click.prevent="getRecommandProduct(item.id)">
                <div class="card shadow-sm">
                  <div class="card-shadow-vw"
                    style="background-size: contain; background-repeat: no-repeat; background-position: center;"
                    :style="{ backgroundImage: `url(${item.imageUrl})` }"></div>
                  <div class="card-body">
                    <h6 class="card-title">{{ item.title }}</h6>
                  </div>

                  <div class="card-footer d-flex justify-content-end">
                    <div class="h6" v-if="!item.price">{{ item.origin_price | currency }}</div>
                    <div class="h6" v-if="item.price">{{ item.price | currency }}</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      <GoTop></GoTop>
  </div>
</template>

<script>

import GoTop from '@/components/GoTop'
import axios from 'axios'

export default {
  data () {
    return {
      productId: '',
      recommandProducts: [],
      localProducts: [],
      product: {
        num: 1
      },
      isDisable: false,
      flag: false
    }
  },

  watch: {
    $route (to, from) {
      this.productId = this.$route.params.productID
      this.getSingleProduct()
    }
  },
  methods: {
    getSingleProduct () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${this.productId}`
      this.$store.dispatch('updateLoading', true)
      this.randomProduct(this.localProducts, 4)
      this.$http.get(api).then(response => {
        if (response.data.success) {
          this.product = response.data.product
          this.$set(this.product, 'num', 1)
          this.$store.dispatch('updateLoading', false)
        }
      })
    },
    getRecommandProduct (id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      this.$store.dispatch('updateLoading', true)
      this.$http.get(api).then(response => {
        if (response.data.success) {
          this.$store.dispatch('updateLoading', false)
          this.$router.push(`../front_single_product/${response.data.product.id}`).catch(err => err)
        }
      })
    },
    getCart () {
      this.$store.dispatch('getCart')
    },
    addToCart (id, direct, qty = 1) {
      if (this.flag) {
        return
      }
      const addApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      this.$store.dispatch('updateLoading', true)
      this.$store.dispatch('getCart').then(cartItem => {
        const cartProducts = cartItem.filter(item => {
          return item.product_id === id
        })
        let cart = {
          product_id: id,
          qty
        }
        if (cartProducts.length > 0) {
          this.flag = true
          const totalNum = cartProducts[0].qty
          cart = {
            product_id: id,
            qty: qty + totalNum
          }
          const deleteApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cartProducts[0].id}`
          Promise.all([axios.post(addApi, { data: cart }), axios.delete(deleteApi)])
            .then(() => {
              this.flag = false
            })
        } else if (cartProducts.length === 0) {
          this.$http.post(addApi, { data: cart }).then(response => {
            this.flag = false
            if (response.data.success) {
              this.$store.dispatch('getCart')
              this.$store.dispatch('updateLoading', false)
            }
          })
        }
        if (direct) {
          this.$router.push('../shopping_cart/front_cart_items')
        }
      })
    },
    quantitySub () {
      if (this.product.num > 1) {
        this.product.num--
      }
      localStorage.setItem('myCart', JSON.stringify(this.cartData))
    },
    quantityPlus () {
      if (this.product.num < 15) {
        this.product.num++
      }
      localStorage.setItem('myCart', JSON.stringify(this.cartData))
    },
    randomProduct (arr, num) {
      const newArr = []
      if (arr.length <= num) {
        num = arr.length
      }

      rand(num)
      function rand (selectQty) {
        if (selectQty === 0) {
          return false
        }
        const index = Math.floor(Math.random() * arr.length)
        let flag = true
        newArr.forEach((item) => {
          if (item === arr[index]) {
            flag = false
          }
        })
        if (flag) {
          newArr.push(arr[index])
          selectQty--
        }
        rand(selectQty)
      }
      this.recommandProducts = newArr
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    cart () {
      return this.$store.state.cart
    }
  },
  created () {
    this.productId = this.$route.params.productID
    this.localProducts = JSON.parse(
      localStorage.getItem('filteredList')
    )
    this.getSingleProduct()
    this.getCart()
  },
  components: {
    GoTop
  }
}
</script>
