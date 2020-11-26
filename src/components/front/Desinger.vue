<template>
    <div>      
        <loading :active.sync="isLoading"></loading>
         <div class="banner_open_line">
          <a href="https://line.me/ti/p/dKAzJfqWhb"><img src="~@/assets/calendar/LINEAPP.png"/></a>
        </div>
        <div class="banner_open_shoppingcart">
          <router-link  href="#" to="/shopping_cart/front_cart_items">
            <img src="~@/assets/calendar/shoppingCart.jpg"/>
          </router-link>
        </div> 
        <div class="swiper-slide games">
            <img src="~@/assets/GirlsUnique/Banner01.jpg" alt="Banner">
        </div>

          <div class="row mt-4" style="margin-top: initial !important;">
            <div class="bg">
              <div class='content'>
                  <div class="h6" style="margin-top:2rem; margin-left:1rem;margin-bottom:initial;">
                    <router-link href="#" to="/morestyle">                   
                      獨家設計 Designer collection
                    </router-link>
                  </div>
                <ul class="girl clearfix" >
                  <li v-for="(item, key) in desinger.slice(pageStart, pageStart + countPage)" :key="key">             
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
      products: [],
      isLoading: false,
      current_page: 1,
      countPage: 18,
      desinger: [],
    };
  },
  components: {
    GoTop,
  },
  methods: {
    getAllProducts() {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      this.isLoading = true;
      this.$http.get(url).then((response) => {
        this.products = response.data.products;
        console.log(response);
        this.isLoading = false;
        let desingerStyle = this.products.filter(function(item) {
            return item.category.indexOf('DESIGNER') !== -1;
          });
         this.desinger = desingerStyle;
      });
    },
    getProduct(id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      this.isLoading = true;
      localStorage.setItem('cateFilteredList', JSON.stringify(this.products));
      this.$http.get(url).then((response) => {
        if(response.data.success) {
          this.isLoading = false;
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
  },  
  computed: {
    pageStart() {
      return (this.current_page - 1) * this.countPage;
    },
    totalPage() {
      return Math.ceil( this.desinger.length / this.countPage);
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>