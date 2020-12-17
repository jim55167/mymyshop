<template>
  <div class="fsp-container-fluid">
    <Loading :active.sync="isLoading"></Loading>
    <div class="banner_open_shoppingcart">
          <router-link  href="#" to="/shopping_cart/front_cart_items">
            <span class="badge">{{cart.carts.length}}</span>
            <img src="~@/assets/calendar/shoppingCart.jpg"/>
          </router-link>
        </div>
    <div class="product-header">
      <div class="row justify-content-center">
        <div class="product-wrap col-12 col-md-6">
          <div class="product-img">
            <div class="abs-wrap">
              <img v-lazy="product.imageUrl" alt />
            </div>
          </div>
        </div>

        <div class="product-info col-12 col-md-6">
          <div class="product-title">
            <h2 style="font-size:2rem; margin-bottom: .5rem;
              font-weight: 500; line-height: 1.2;">
              {{product.title}}
            </h2>
          </div>

          <div class="product-price d-flex justify-content-between align-items-baseline">
            <div class="h4 text-danger mb-0" v-if="!product.price">{{product.origin_price | currency}}</div>
            <del class="h5 mb-0" v-if="product.price">{{product.origin_price | currency}}</del>
            <div class="h4 text-danger mr-2 mb-0" v-if="product.price">{{product.price | currency}}</div>
          </div>

          <pre class="product-content">{{product.content}}</pre>

          <div class="product-input">
            <div class="quantity">
              <span class="quantity-title">QUANTITY</span>
              <button class="btn btn-outline-third" @click="quantitySub(product)">-</button>
              <input type="text" :value="product.num" readonly="readonly" />
              <button class="btn btn-outline-third" @click="quantityPlus(product)">+</button>
            </div>

            <div class="buy-option">
              <button type="button" class="btn btn-primary mr-1percent"
                @click="addToCart(product.id, true, product.num)" >
                <i class="fas fa-circle-notch fa-spin" v-if="loadingItem == 'direct'"></i> BUY NOW
              </button>
              <button type="button" class="btn btn-danger"
                @click="addToCart(product.id, false, product.num)">
                <i class="fas fa-circle-notch fa-spin" v-if="loadingItem == 'non-direct'"></i> ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="product-description">
      <div class="row my-3">
        <div class="description-title col-12">
          <h3 style="font-size:1.75rem;">PRODUCT INFO</h3>
        </div>
        <div style="width:90vw;margin:0 auto;">
          <img style="padding-bottom:20px;" v-lazy="product.imageUrl3" alt />
          <img v-lazy="product.imageUrl2" alt />         
        </div>
        <div class="col-12" style="padding-top:20px;">
          <pre>{{product.description}}</pre>
        </div>
      </div>
    </div>

        <div class="recommand-products">
          <div class="row mb-3">
            <div class="recommand-title mt-1 mb-3 col-12">
              <h5 style="font-size:1.25rem; margin-bottom:.5rem;">MAYBE YOU WILL LIKE...</h5>
            </div>
            <div class="col-md-3 col-sm-6 col-12 mb-4 recommand-hover"
              v-for="(item, index) in recommandProducts" :key="index">
              <a class="link-block" href="#"
                @click="getRecommandProduct(item.id)">
                <div class="card shadow-sm">
                  <div class="card-shadow-vw"
                    style="background-size: contain; background-repeat: no-repeat; background-position: center;"
                    :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                  <div class="card-body">
                    <h6 style="font-size:1rem" class="card-title">{{item.title}}</h6>
                  </div>

                  <div class="card-footer d-flex justify-content-end">
                    <div class="h6" style="font-size:1rem" v-if="!item.price">{{item.origin_price | currency}}</div>
                    <div class="h6" v-if="item.price">{{item.price | currency}}</div>
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

import GoTop from '../GoTop';

export default {
  data() {
    return {
      productId: "",
      recommandProducts: [],
      localProducts: [],
      product: {
        num: 1
      },
      loadingItem: '',
    };
  },
  components: {
    GoTop,
  },
  watch: {
    $route(to, from) {
      this.productId = this.$route.params.productID;
      this.getSingleProduct();
    }
  },

  methods: {
    getSingleProduct() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${this.productId}`;
      this.$store.dispatch('updateLoading',true);
      this.randomProduct(this.localProducts, 4);

      this.$http.get(api).then(response => {
        if (response.data.success) {
          this.product = response.data.product;
          this.$set(this.product, "num", 1);
          this.$store.dispatch('updateLoading',false);
        }
      });
    },

    getRecommandProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      this.$store.dispatch('updateLoading',true);
      this.$http.get(api).then(response => {
        if (response.data.success) {
          this.$store.dispatch('updateLoading',false);
          this.$router.push( `../front_single_product/${response.data.product.id}`).catch(err => {err});  
        }
      });
    },

    getCart() {
      this.$store.dispatch('getCart');
    },

    addToCart(id, direct, qty = 1) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty
      };
      if (direct) {
        this.loadingItem = 'direct';
      } else {
        this.loadingItem = 'non-direct';
      }

      this.$http.post(url, { data: cart }).then(response => {      
        if (response.data.success) {
          this.getCart();
          this.loadingItem = '';

          if (direct) {
            this.$router.push(`../shopping_cart/front_cart_items`);
          }
        }
      });
    },

    removeCartItem(id) {
      this.$store.dispatch('removeCartItem', id);
    },

    quantitySub(product) {
      if (this.product.num > 1) {
        this.product.num--;
      }
    },

    quantityPlus(product) {
      if (this.product.num < 10) {
        this.product.num++;
      }
    },

    randomProduct(arr, num) {   
      let newArr = [];
      if (arr.length <= num) {
        num = arr.length; 
      }
    
      rand(num);

      function rand(selectQty) {
        if (selectQty == 0) {
          return;
        }
        let index = Math.floor(Math.random() * arr.length);
        let flag = true;
        newArr.forEach(function(item) {
          if (item == arr[index]) { 
            flag = false;
          }
        });
        if (flag) {
          newArr.push(arr[index]);
          selectQty--;
        }
        rand(selectQty);
      }
      this.recommandProducts = newArr;
    }
  },

  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    cart(){
      return this.$store.state.cart;
    },
  },

  created() {
    this.productId = this.$route.params.productID;
    this.localProducts = JSON.parse(
      localStorage.getItem("filteredList")
    );
    this.getSingleProduct();
    this.getCart();
  }
};
</script>