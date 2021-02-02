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
        <tr v-for="item in cart.carts" :key="item.id">
          <td class="align-middle d-md-table-cell">
            <div class="product-preview d-md-block"
              :style="{ backgroundImage: `url(${item.product.imageUrl})` }"></div>
          </td>
          <td class="align-middle text-center">
            {{ item.product.title }}
            <div class="text-primary" v-if="item.coupon">已套用優惠券</div>
          </td>
          <td class="align-middle d-sm-table-cell d-none qty-adjust">
            <input type="button" class="btn" @click.prevent="quantitySub(item)" value="-">
            <input type="text" :value="item.qty" readonly="readonly"/>
            <input type="button" class="btn" @click.prevent="quantityPlus(item)" value="+">
          </td>
          <td class="align-middle">
            {{ item.product.price | currency }} / {{ item.total | currency }}
            <div class="text-primary" v-if="item.coupon">{{ item.final_total | currency }}</div>
          </td>
          <td class="align-middle">
            <button type="button" class="btn btn-outline-danger btn-sm"
              @click.prevent="removeCartItem(item.id)">
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot class="sales-price">
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td class="text-right">{{ cart.total | currency }}</td>
        </tr>
        <tr v-if="cart.final_total !== cart.total">
          <td colspan="3" class="text-right text-right-red">折扣價</td>
          <td class="text-right text-right-red">{{ cart.final_total | currency }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="input-group mb-3 input-group-sm">
      <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼"/>
      <div class="input-group-append">
        <input class="btn btn-primary" type="button" @click.prevent="addCouponCode" value="套用優惠碼">
        <div class="coupon-message">{{ this.active }}</div>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-4 step-control">
      <router-link class="btn btn-primary" to="/home">返回賣場</router-link>
      <router-link class="btn btn-danger" to="front_order" v-if="nextPage">下一步</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FrontCartItems',
  data () {
    return {
      active: '',
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    updateCart (cartItemId, productId, qty) {
      this.$store.dispatch('updateCart', { cartItemId, productId, qty })
    },
    addToCart (id, qty = 1) {
      this.$store.dispatch('addtoCart', { id, qty })
    },
    getCart () {
      this.$store.dispatch('getCart')
    },
    removeCartItem (id) {
      this.$store.dispatch('removeCartItem', id)
    },
    quantitySub (item) {
      if (item.qty > 1) {
        this.updateCart(item.id, item.product_id, item.qty - 1)
      }
    },
    quantityPlus (item) {
      if (item.qty < 10) {
        this.updateCart(item.id, item.product_id, item.qty + 1)
      }
    },
    addCouponCode () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.$store.dispatch('updateLoading', true)
      this.$http.post(api, { data: coupon }).then(response => {
        const alert = response.data.message
        this.active = alert
        this.getCart()
        this.$store.dispatch('updateLoading', false)
      })
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
  }
}
</script>
