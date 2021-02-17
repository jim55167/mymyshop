<template>
  <div class="item-wrap">
    <Loading :active.sync="isLoading"></Loading>
    <table class="table">
      <thead>
        <tr>
          <th class="d-md-table-cell">產品圖</th>
          <th>產品名稱</th>
          <th class="d-sm-table-cell d-none" width="120px">數量</th>
          <th width="25%">價格</th>
          <th width="60px">刪除</th>
        </tr>
      </thead>
      <tbody class="cart-items">
        <tr v-for="item in myShoppingcart" :key="item.id">
          <td class="align-middle d-md-table-cell">
            <div class="product-preview d-md-block"
              :style="{ backgroundImage: `url(${item.imageUrl})` }"></div>
          </td>
          <td class="align-middle text-center">
            {{ item.title }}
            <!-- <div class="text-primary" v-if="item.coupon">已套用優惠券</div> -->
          </td>
          <td class="align-middle d-sm-table-cell d-none qty-adjust">
            <input type="button" class="btn" @click="quantitySub(item)" value="-">
            <input type="text" :value="item.qty" readonly="readonly"/>
            <input type="button" class="btn" @click="quantityPlus(item)" value="+">
          </td>
          <td class="align-middle">
            {{ item.price | currency }} / {{ item.price * item.qty | currency }}
            <div class="text-primary" v-if="item.coupon">{{ item.final_total | currency }}</div>
          </td>
          <td class="align-middle">
            <button type="button" class="btn btn-outline-danger btn-sm"
              @click.prevent="removeCartItem(item)">
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot class="sales-price">
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td class="text-right">{{ totalPrice | currency }}</td>
        </tr>
        <tr v-if="cart.final_total !== cart.total">
          <td colspan="3" class="text-right text-right-red">折扣價</td>
          <td class="text-right text-right-red">{{ Math.round(cart.final_total) | currency }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="input-group mb-3 input-group-sm">
      <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼"/>
      <div class="input-group-append">
        <input class="btn btn-primary" type="button" @click.prevent="addCouponCode()" value="套用優惠碼">
        <div class="coupon-message">{{ this.focus }}</div>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-4 step-control">
      <router-link class="btn btn-primary" to="/home">返回賣場</router-link>
      <a class="btn btn-danger" href="#" @click.prevent= "goCheckout" v-if="nextPage">下一步</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FrontCartItems',
  data () {
    return {
      coupon_code: '',
      focus: '',
      myShoppingcart: JSON.parse(localStorage.getItem('myCart')) || [],
      totalPrice: 0
    }
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
    },
    deleteCartData (id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      this.$http.delete(api).then((response) => {})
    },
    removeCartItem (id) {
      this.myShoppingcart.forEach((item, key) => {
        console.log(item)
        if (id.product_id === item.product_id) {
          this.myShoppingcart.splice(key, 1)
        }
        localStorage.setItem('myCart', JSON.stringify(this.myShoppingcart))
        this.getTotalPrice()
      })
      this.cart.carts.forEach((item) => {
        console.log(this.cart.carts)
        if (id.product_id === item.product_id) {
          this.deleteCartData(item.id)
        }
      })
      this.$store.dispatch('getCart')
    },
    getTotalPrice () {
      this.totalPrice = 0
      this.myShoppingcart.forEach((item) => {
        this.totalPrice += item.price * item.qty
      })
    },
    quantitySub (item) {
      item.qty -= 1
      localStorage.setItem('myCart', JSON.stringify(this.myShoppingcart))
      this.getTotalPrice()
      if (item.qty === 0) {
        this.removeCartItem(item)
        localStorage.setItem('myCart', JSON.stringify(this.myShoppingcart))
      }
    },
    quantityPlus (item) {
      item.qty += 1
      localStorage.setItem('myCart', JSON.stringify(this.myShoppingcart))
      this.getTotalPrice()
    },
    addCouponCode () {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      console.log(this.coupon_code)
      this.$store.dispatch('updateLoading', true)
      this.$http.post(url, { data: coupon }).then(response => {
        this.focus = response.data.message
        this.getCart()
        this.$store.dispatch('updateLoading', false)
      })
    },
    goCheckout () {
      this.$store.dispatch('updateLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      this.myShoppingcart.forEach((item) => {
        console.log(item)
        const cartItem = {
          product_id: item.product_id,
          qty: item.qty
        }
        this.$http.post(api, { data: cartItem }).then(() => {
          this.$store.dispatch('updateLoading', false)
        })
      })
      this.cart.carts.forEach((item) => {
        this.myShoppingcart.forEach((item2) => {
          if (item.product_id === item2.product_id) {
            this.deleteCartData(item.id)
          }
        })
      })
      this.$router.push('/shopping_cart/front_order').catch(err => err)
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    nextPage () {
      if (this.cart.carts === 0) {
        return false
      } else {
        return true
      }
    }
  },
  created () {
    this.getCart()
    this.getTotalPrice()
  }
}
</script>
