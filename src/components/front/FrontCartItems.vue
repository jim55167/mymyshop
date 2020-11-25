<template>
  <div class="item-wrap">
    <loading :active.sync="isLoading"></loading>
    <table class="table">
      <thead>
        <tr>
          <th class="d-md-table-cell">PIC</th>
          <th>NAME</th>
          <th class="d-sm-table-cell d-none" width="120px">QUANTITY</th>
          <th width="25%">PRICE</th>
          <th width="60px">REMOVE</th>
        </tr>
      </thead>
      <tbody class="cart-items">
        <tr v-for="item in cart.carts" :key="item.id">
          <td class="align-middle d-md-table-cell">
            <div class="product-preview d-md-block"
              :style="{backgroundImage: `url(${item.product.imageUrl})`}"></div>
          </td>
          <td class="align-middle text-center">
            {{ item.product.title }}
            <div class="text-primary" v-if="item.coupon">已套用優惠券</div>
          </td>
          <td class="align-middle d-sm-table-cell d-none qty-adjust">
            <button class="btn btn-outline-secondary" @click="quantitySub(item)">-</button>
            <input type="text" :value="item.qty" readonly="readonly"/>
            <button class="btn btn-outline-secondary" @click="quantityPlus(item)">+</button>
          </td>
           <td class="align-middle">
            {{item.product.price | currency}} /{{item.total | currency}}
            <div class="text-primary" v-if="item.coupon">{{item.final_total | currency}}</div>
          </td>
          <td class="align-middle">
            <button type="button" class="btn btn-outline-danger btn-sm"
              @click="removeCartItem(item.id)">
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td class="text-right">{{ cart.total | currency}}</td>
        </tr>
        <tr v-if="cart.final_total !== cart.total">
          <td colspan="3" class="text-right" style="color:red;">折扣價</td>
          <td class="text-right" style="color:red;">{{ cart.final_total | currency}}</td>
        </tr>
      </tfoot>
    </table>
    <div class="input-group mb-3 input-group-sm">
      <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼"/>
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="addCouponCode">套用優惠碼</button>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-4 step-control">
      <router-link class="btn btn-primary" to="/home">BACK TO SHOP</router-link>
      <router-link class="btn btn-danger" to="front_order" v-if="nextPage">FILL INFO</router-link>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      cart: [],
      isLoading: false,
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  methods: {
    updateCart(cartItem_id, product_id, qty) {
      const delete_api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${cartItem_id}`;
      const add_api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const cart = {
        product_id: product_id,
        qty
      };
      this.isLoading = true;

      this.$http.delete(delete_api).then(response => {
        if (response.data.success) {
          this.$http.post(add_api, {data: cart}).then(response => {
            if (response.data.success) {
              this.getCart();
            }
          });        
        } 
      });
    },

    addtoCart(id, qty) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(url, { data: cart }).then(response => {
        this.getCart();
      });
    },
    getCart() {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then(response => {
        this.cart = response.data.data;
        console.log(response);
        this.isLoading = false;
      });
    },
    removeCartItem(id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      this.isLoading = true;
      this.$http.delete(url).then(response => {
        this.isLoading = false;
        this.getCart();       
      });
    },
    quantitySub(item) {
      if (item.qty > 1) {
        this.updateCart(item.id, item.product_id, item.qty - 1);
      }
    },

    quantityPlus(item) {
      if (item.qty < 10) {
        this.updateCart(item.id, item.product_id, item.qty + 1);
      }
    },
    addCouponCode() {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: this.coupon_code
      };
      this.isLoading = true;
      this.$http.post(url, { data: coupon }).then(response => {
        console.log(response);
        this.getCart();
        this.isLoading = false;
      });
    },
    
  },
  computed: {
    nextPage() {
      if(this.cart.carts == 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    this.getCart();
  }
};
</script>
