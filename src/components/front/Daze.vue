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
            <img src="~@/assets/Daze/Banner01.jpg" alt="Banner" style="object-fit:cover;">
        </div>

          <div class="row mt-4" style="margin-top: initial !important;">
            <div class="bg">
              <div class='content'>
                  <div class="h6" style="margin-top:2rem; margin-left:1rem;margin-bottom:initial;">
                    <div class="bt21">
                      <router-link href="#" to="/morestyle">                   
                        輕生活 Outdoor Daze
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
      daze: [],
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
        let dazeStyle = vm.products.filter(function(item) {
            return item.category.indexOf('Daze') !== -1;
          });
        vm.daze = dazeStyle;       
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
    getCategory(){
      const categories = new Set();
      this.products.forEach((item) => {
        categories.add(item.category);
      });
      this.categories = Array.from(categories);
      
    },
    getCart() {
      this.$store.dispatch('getCart');
    },
  },  
  computed: {
    products(){
      return this.$store.state.products;
    },
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
      return Math.ceil( this.daze.length / this.countPage);
    },
    categoryData() {
      if (this.visibility == '全部商品') {
        return this.daze;
      } else if (this.visibility == '上衣'){
        let categoryList = [];
        this.daze.forEach(function(item) {
          if(item.category =='Daze/上衣'){
            categoryList.push(item);
          }          
        })
        return categoryList;
      } else if (this.visibility == '洋裝'){
        let categoryList = [];
        this.daze.forEach(function(item) {
          if(item.category =='Daze/洋裝'){
            categoryList.push(item);
          }          
        })
        return categoryList;
      } else if (this.visibility == '外套'){
        let categoryList = [];
        this.daze.forEach(function(item) {
          if(item.category =='Daze/外套'){
            categoryList.push(item);
          }          
        })
        return categoryList;
      } else if (this.visibility == '襯衫'){
        let categoryList = [];
        this.daze.forEach(function(item) {
          if(item.category =='Daze/襯衫'){
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