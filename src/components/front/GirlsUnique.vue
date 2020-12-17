<template>
    <div>      
        <Loading :active.sync="isLoading"></Loading>
         <div class="banner_open_line">
          <a href="https://line.me/ti/p/dKAzJfqWhb"><img src="~@/assets/calendar/LINEAPP.png"/></a>
        </div>
        <div class="banner_open_shoppingcart">
          <router-link  href="#" to="/shopping_cart/front_cart_items">
            <span class="badge">{{cart.carts.length}}</span>
            <img src="~@/assets/calendar/shoppingCart.jpg"/>
          </router-link>
        </div> 
        <div class="swiper-slide games">
            <img src="~@/assets/Designer/Banner01.jpg" alt="Banner">
        </div>

          <div class="row mt-4" style="margin-top: initial !important;">
            <div class="bg">
              <div class='content'>
                  <div class="h6" style="margin-top:2rem; margin-left:1rem;margin-bottom:initial;">
                    <div class="bt21">
                      <router-link href="#" to="/morestyle">                   
                        獨家設計 Designer collection
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
                            :class="{'active': visibility == '鞋'}"
                            @click.prevent="visibility = '鞋'">鞋</a>
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
                            :class="{'active': visibility == '洋裝'}"
                            @click.prevent="visibility = '洋裝'">洋裝</a>
                          </td>
                          <td>
                            <a href="#" class="nav-linl"
                            :class="{'active': visibility == '襯衫'}"
                            @click.prevent="visibility = '襯衫'">襯衫</a>
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
                  </div>
                <ul class="girl clearfix" >
                  <li v-for="(item, key) in categoryData.slice(pageStart, pageStart + countPage)" :key="key">             
                    <a href="#" @click.prevent="getProduct(item.id)" target="_parent">
                      <div class="bodycard" v-lazy:background-image="item.imageUrl"></div>
                      <div class="overlay-girl">
                        <h1>{{ item.title }}</h1>
                        <div class="align-items-baseline">
                        <del class="h6" style="color:#CCC;" v-if="item.price">原價 {{ item.origin_price | currency }} 元</del>
                        <div class="h5" style="color:#DC201F;" v-if="item.price">優惠價 {{ item.price | currency }} 元</div>
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
      girls: [],
      visibility: '全部商品',
    };
  },
  components: {
    GoTop,
  },
  methods: {
    getAllProducts() { 
        const vm = this;  
        vm.$store.dispatch('getAllProducts');   
        let GirlsUnique = vm.products.filter(function(item) {
            return item.category.indexOf('私服衣櫃') !== -1;
          });
        vm.girls = GirlsUnique;        
    },
    getProduct(id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      this.$store.dispatch('updateLoading',true);
      localStorage.setItem('filteredList', JSON.stringify(this.products));
      this.$http.get(url).then((response) => {
        if(response.data.success) {
          this.$store.dispatch('updateLoading',false);
          this.$router.push(`../front_single_product/${response.data.product.id}`)
        }
      });
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
    products(){
      return this.$store.state.products;
    },
    isLoading(){
      return this.$store.state.isLoading;
    },
    cart(){
      return this.$store.state.cart;
    },
    pageStart() {
      return (this.current_page - 1) * this.countPage;
    },
    totalPage() {
      return Math.ceil( this.categoryData.length / this.countPage);
    },
    categoryData() {
      if (this.visibility == '全部商品') {
        return this.girls;
      } else if (this.visibility == '上衣'){
        let categoryList = [];
        this.girls.forEach(function(item) {
          if(item.category =='私服衣櫃/上衣'){
            categoryList.push(item);
          }          
        });
        return categoryList;
      } else if (this.visibility == '長褲'){
        let categoryList = [];
        this.girls.forEach(function(item) {
          if(item.category =='私服衣櫃/長褲'){
            categoryList.push(item);
          }          
        });
        return categoryList;
      } else if (this.visibility == '外套'){
        let categoryList = [];
        this.girls.forEach(function(item) {
          if(item.category =='私服衣櫃/外套'){
            categoryList.push(item);
          }          
        });
        return categoryList;
      } else if (this.visibility == '吊帶褲'){
        let categoryList = [];
        this.girls.forEach(function(item) {
          if(item.category =='私服衣櫃/吊帶褲'){
            categoryList.push(item);
          }          
        });
        return categoryList;
      } else if (this.visibility == '穿搭配件'){
        let categoryList = [];
        this.girls.forEach(function(item) {
          if(item.category =='私服衣櫃/穿搭配件'){
            categoryList.push(item);
          }          
        });
        return categoryList;
      } else if (this.visibility == '襯衫'){
        let categoryList = [];
        this.girls.forEach(function(item) {
          if(item.category =='私服衣櫃/襯衫'){
            categoryList.push(item);
          }          
        });
        return categoryList;
      } else if (this.visibility == '洋裝'){
        let categoryList = [];
        this.girls.forEach(function(item) {
          if(item.category =='私服衣櫃/洋裝'){
            categoryList.push(item);
          }          
        });
        return categoryList;
      } else if (this.visibility == '鞋'){
        let categoryList = [];
        this.girls.forEach(function(item) {
          if(item.category =='私服衣櫃/鞋'){
            categoryList.push(item);
          }          
        });
        return categoryList;
      } else if (this.visibility == '裙子'){
        let categoryList = [];
        this.girls.forEach(function(item) {
          if(item.category =='私服衣櫃/裙子'){
            categoryList.push(item);
          }          
        });
        return categoryList;
      } 
    }
  },
  created() {
    this.getAllProducts();
  },
};
</script>