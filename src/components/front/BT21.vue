<template>
    <div>
        <Loading :active.sync="isLoading"></Loading>
        <div class="banner_open_line">
          <a href="https://line.me/ti/p/dKAzJfqWhb"><img src="~@/assets/calendar/LINEAPP.png"/></a>
        </div>

        <swiper class="swiper" :options="swiperOption">
          <swiper-slide class="swiper-slide games"
            v-for="item in imgs" :key="item">
            <img :src="item" alt="" style="object-fit:cover;">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>

        <div class="banner_open_shoppingcart">
          <router-link  href="#" to="/shopping_cart/front_cart_items">
            <span class="badge">{{cart.carts.length}}</span>
            <img src="~@/assets/calendar/shoppingCart.jpg"/>
          </router-link>
        </div>
          <div class="row mt-4" style="margin-top: initial !important;">
            <div class="bg">
              <div class='content'>
                <div class="bt21">
                  <router-link href="#" to="/morestyle"> 
                    BT21全系列
                  </router-link>
                  <div class="btlist">
                    <tr style="display:flex;">商品分類：
                      <td> 
                        <a href="#" class="nav-linl"
                        :class="{'active': visibility == '全部商品'}"
                        @click.prevent="visibility = '全部商品'">全部商品</a>
                      </td>
                      <td>
                        <a href="#" class="nav-linl"
                        :class="{'active': visibility == '上衣'}"
                        @click.prevent="visibility = '上衣'">上衣</a>
                      </td>
                      <td>
                        <a href="#" class="nav-linl"
                        :class="{'active': visibility == '長褲'}"
                        @click.prevent="visibility = '長褲'">長褲</a>
                      </td>                    
                      <td>
                        <a href="#" class="nav-linl"
                        :class="{'active': visibility == '外套'}"
                        @click.prevent="visibility = '外套'">外套</a>
                      </td>       
                      <td>
                        <a href="#" class="nav-linl"
                        :class="{'active': visibility == '裙子'}"
                        @click.prevent="visibility = '裙子'">裙子</a>
                      </td>       
                      <td>
                        <a href="#" class="nav-linl"
                        :class="{'active': visibility == '吊帶褲'}"
                        @click.prevent="visibility = '吊帶褲'">吊帶褲</a>
                      </td> 
                      <td>
                        <a href="#" class="nav-linl"
                        :class="{'active': visibility == '穿搭配件'}"
                        @click.prevent="visibility = '穿搭配件'">穿搭配件</a>
                      </td> 
                    </tr>
                  </div>
                </div>
                <ul class="girl clearfix">
                  <li v-for="(item, key) in categoryData.slice(pageStart, pageStart + countPage)" :key="key">             
                    <a href="#" @click.prevent="getProduct(item.id)" target="_parent">
                      <div class="bodycard" v-lazy:background-image="item.imageUrl"></div>
                      <div class="overlay-girl">
                        <h1>{{ item.title }}</h1>
                        <div class="align-items-baseline">
                        <del class="h6" style="color:#CCC;" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                        <div class="h5" style="color:#DC201F;" v-if="item.price">優惠價 {{ item.price }} 元</div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>           
          </div>
         
        <!-- bootstrap pagination -->
        <div style="display: flex;"> 
          <nav aria-label="Page navigation example" style="margin:0 auto 15px">
            <ul class="pagination">
              <li class="page-item" :class="{ 'disabled': current_page === 1 }">
                <a class="page-link" href="#" aria-label="Previous"
                  @click="getPage(current_page - 1)">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item" v-for="page in totalPage" :key="page"
                :class="{'active': current_page === page}"> 
                <a class="page-link" href="#" @click="getPage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{'disabled': current_page === totalPage}">
                <a class="page-link" href="#" aria-label="Next"
                  @click="getPage(current_page + 1)">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav> 
        </div>
      <GoTop></GoTop>
    </div>
</template>


<script>

import $ from 'jquery';
import GoTop from '../GoTop';

export default {
  data() {
    return {
      current_page: 1,
      countPage: 6, 
      BT21: [],
      visibility: '全部商品',
      products: [],
      imgs: [
        require('../../assets/BT21/banner01.jpg'),
        require('../../assets/BT21/banner02.jpg'),
        require('../../assets/BT21/banner03.jpg'),
        require('../../assets/BT21/banner04.jpg'),
      ],
      swiperOption: {
              spaceBetween: 30,
              centeredSlides: true,
              autoplay: {
                delay: 3000, //自動循環時間
                disableOnInteraction: false, //用戶操作後是否禁止自動循環
              },
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }
            },    
    };
  },
  components: {
    GoTop,
  },
  methods: {
    getAllProducts() { 
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
        this.$store.dispatch('updateLoading',true);
        this.$http.get(api).then((response) => {          
            this.products = response.data.products;
            this.$store.dispatch('updateLoading',false);
            let BT21Products = this.products.filter(function(item) {
            return item.category.indexOf('BT21') !== -1;
          });
          this.BT21 = BT21Products;   
        })         
    },
    getProduct(id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      this.$store.dispatch('updateLoading',true);
      localStorage.setItem('filteredList', JSON.stringify(this.products))
      this.$http.get(url).then((response) => {
        console.log(this.response);
        if(response.data.success) {
          this.$store.dispatch('updateLoading',false);
          this.$router.push(`../front_single_product/${response.data.product.id}`)
        }
      });
    },
    cartqty(num){
      this.shoppingCart = num;
      console.log(this.shoppingCart);
    },
    getPage(page) {
      if (page <= 0 || page > this.totalPage) {
        return;
      }
      this.current_page = page;
    },
    getCart() {
      this.$store.dispatch('getCart');
    },
  },
  computed: {
    cart(){
      return this.$store.state.cart;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    pageStart() {
      return (this.current_page - 1) * this.countPage;
    },
    totalPage() {
      return Math.ceil( this.categoryData.length / this.countPage);
    },
    categoryData() {     
      if (this.visibility == '全部商品') {                    
        return this.BT21;      
      } else if (this.visibility == '上衣'){               
        let categoryList = [];                          
        this.BT21.forEach(function(item) {          
          if(item.category =='BT21/上衣'){                                            
            categoryList.push(item);                        
          }                           
        })
        return categoryList;        
      } else if (this.visibility == '長褲'){        
        let categoryList = [];
        this.BT21.forEach(function(item) {
          if(item.category =='BT21/長褲'){
            categoryList.push(item);
          }          
        })
        return categoryList;
      } else if (this.visibility == '外套'){
        let categoryList = [];
        this.BT21.forEach(function(item) {
          if(item.category =='BT21/外套'){
            categoryList.push(item);
          }          
        })
        return categoryList;
      } else if (this.visibility == '裙子'){
        let categoryList = [];
        this.BT21.forEach(function(item) {
          if(item.category =='BT21/裙子'){
            categoryList.push(item);
          }          
        })
        return categoryList;
      } else if (this.visibility == '吊帶褲'){
        let categoryList = [];
        this.BT21.forEach(function(item) {
          if(item.category =='BT21/吊帶褲'){
            categoryList.push(item);
          }          
        })
        return categoryList;
      } else if (this.visibility == '穿搭配件'){
        let categoryList = [];
        this.BT21.forEach(function(item) {
          if(item.category =='BT21/穿搭配件'){
            categoryList.push(item);
          }          
        })
        return categoryList;
      }
    }
  },
  created() {
    this.getAllProducts();
  },
};
</script>