<template>
  <div>
      <loading :active.sync="isLoading"></loading>
      <div class="design-box">
          <div class="design-item">
              <div class="design">
                <p>DESIGN  設計</p>
                <a>鑽研在衣服的舒適度與角度裡<br>
                在乎妳以及與妳有關的生活風格與穿著體驗</a>
                <img src="~@/assets/Design/01.jpg">
              </div>

              <div class="design2">
                <p>MANUFACTURE 縫製</p>
                <a>師傅們用多年經驗淬煉出的美感<br>
                打造剪裁、形狀與細節處理的完美細節</a>
                <div class="design-img">
                    <img src="~@/assets/Design/02.jpg">
                    <img src="~@/assets/Design/03.jpg">
                </div>
              </div>

              <div class="design3">
                <p>PROCESS 加工</p>
                <a>綿密厚實、水洗親膚的堅持<br>
                使衣料更為舒適並同時達到去除異味、防縮及定色</a>
                <div class="design-img">
                    <img src="~@/assets/Design/04.jpg">
                </div>
              </div>

              <div class="design4">
                <p>CHECKING 品檢</p>
                <a>就像見情人般的小心只想把完美與溫暖留在妳的心底<br>
                出貨前必定經過多重檢測讓妳遇見我們就此癡心絕對</a>
                <div class="design-img">
                    <img src="~@/assets/Design/05.jpg">
                </div>
              </div>
          </div>
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
          isLoading: false,
        }
    },
    components: {
    GoTop,
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`; //'https://vue-course-api.hexschool.io/api/jim55167/products'
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.isLoading = false;
        this.products = response.data.products;
      });
    },
  },
  created() {
    this.getProducts();  
  },
}
</script>