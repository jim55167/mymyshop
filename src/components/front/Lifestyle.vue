<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="banner_open_line">
      <a href="https://line.me/ti/p/dKAzJfqWhb"
        ><img alt="line" src="~@/assets/calendar/LINEAPP.png"
      /></a>
    </div>
    <div class="banner_open_shoppingcart">
      <router-link href="#" to="/shopping_cart/front_cart_items">
        <span class="badge">{{ cart.carts.length }}</span>
        <img alt="購物車" src="~@/assets/calendar/shoppingCart.jpg" />
      </router-link>
    </div>
    <div class="swiper-slide games">
      <img
        src="~@/assets/calendar/LIFESTYLE.jpg"
        alt="Banner"
        style="object-fit:cover;"
      />
    </div>
    <div class="row mt-4" style="margin-top: initial !important;">
      <div class="bg">
        <div class="content">
          <div
            class="h6"
            style="margin-top:2rem; margin-left:1rem;margin-bottom:initial;"
          >
            <div class="bt21">
              <router-link href="#" to="/morestyle">
                MyMyShop COMFY AND STYLISH
              </router-link>
              <div class="btlist">
                <tr style="display:flex;">
                  商品分類：
                  <td>
                    <a
                      href="#"
                      class="nav-linl"
                      :class="{ active: visibility == '全部商品' }"
                      @click.prevent="visibility = '全部商品'"
                      >全部商品</a
                    >
                  </td>
                  <td>
                    <a
                      href="#"
                      class="nav-linl"
                      :class="{ active: visibility == '上衣' }"
                      @click.prevent="visibility = '上衣'"
                      >上衣</a
                    >
                  </td>
                  <td>
                    <a
                      href="#"
                      class="nav-linl"
                      :class="{ active: visibility == '長褲' }"
                      @click.prevent="visibility = '長褲'"
                      >長褲</a
                    >
                  </td>
                  <td>
                    <a
                      href="#"
                      class="nav-linl"
                      :class="{ active: visibility == '外套' }"
                      @click.prevent="visibility = '外套'"
                      >外套</a
                    >
                  </td>
                  <td>
                    <a
                      href="#"
                      class="nav-linl"
                      :class="{ active: visibility == '洋裝' }"
                      @click.prevent="visibility = '洋裝'"
                      >洋裝</a
                    >
                  </td>
                </tr>
              </div>
            </div>
          </div>
          <ul class="girl clearfix">
            <li
              v-for="(item, key) in categoryData.slice(
                pageStart,
                pageStart + countPage
              )"
              :key="key"
            >
              <a href="#" @click.prevent="getProduct(item.id)" target="_parent">
                <div
                  class="bodycard"
                  v-lazy:background-image="item.imageUrl"
                ></div>
                <div class="overlay-girl">
                  <h1>{{ item.title }}</h1>
                  <div class="align-items-baseline">
                    <del class="h6" style="color:#CCC;" v-if="item.price"
                      >原價 {{ item.origin_price | currency }} 元</del
                    >
                    <div class="h5" style="color:#DC201F;" v-if="item.price">
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
    <div style="display: flex;">
      <nav aria-label="Page navigation example" style="margin:0 auto 15px">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: current_page === 1 }">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click="getPage(current_page - 1)"
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
            <a class="page-link" href="#" @click="getPage(page)">{{ page }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: current_page === totalPage }"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click="getPage(current_page + 1)"
            >
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

import GoTop from "../GoTop";

export default {
  data() {
    return {
      products: [],
      current_page: 1,
      countPage: 6,
      lifestyle: [],
      visibility: "全部商品"
    };
  },
  methods: {
    getAllProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      this.$store.dispatch("updateLoading", true);
      this.$http.get(api).then(response => {
        this.products = response.data.products;
        this.$store.dispatch("updateLoading", false);
        let LifestyleProducts = this.products.filter(function(item) {
          return item.category.indexOf("lifestyle") !== -1;
        });
        this.lifestyle = LifestyleProducts;
      });
    },
    getProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      this.$store.dispatch("updateLoading", true);
      localStorage.setItem("filteredList", JSON.stringify(this.products));
      this.$http.get(api).then(response => {
        if (response.data.success) {
          this.$store.dispatch("updateLoading", false);
          this.$router.push(
            `../front_single_product/${response.data.product.id}`
          );
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
      this.$store.dispatch("getCart");
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    cart() {
      return this.$store.state.cart;
    },
    pageStart() {
      return (this.current_page - 1) * this.countPage;
    },
    totalPage() {
      return Math.ceil(this.categoryData.length / this.countPage);
    },
    categoryData() {
      if (this.visibility == "全部商品") {
        return this.lifestyle;
      } else if (this.visibility == "上衣") {
        let categoryList = [];
        this.lifestyle.forEach(function(item) {
          if (item.category == "lifestyle/上衣") {
            categoryList.push(item);
          }
        });
        return categoryList;
      } else if (this.visibility == "長褲") {
        let categoryList = [];
        this.lifestyle.forEach(function(item) {
          if (item.category == "lifestyle/長褲") {
            categoryList.push(item);
          }
        });
        return categoryList;
      } else if (this.visibility == "外套") {
        let categoryList = [];
        this.lifestyle.forEach(function(item) {
          if (item.category == "lifestyle/外套") {
            categoryList.push(item);
          }
        });
        return categoryList;
      } else if (this.visibility == "洋裝") {
        let categoryList = [];
        this.lifestyle.forEach(function(item) {
          if (item.category == "lifestyle/洋裝") {
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
  components: {
    GoTop
  }
};
</script>
