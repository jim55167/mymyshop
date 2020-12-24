<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="about-box">
      <div class="about-item">
        <div class="about">
          <img alt="關於我" src="~@/assets/Aboutme/01.jpg" />
          <p>一群只有20出頭的電商新鮮人</p>
          <a
            >MyMyShop相信在這塊土地上的人、事、物都美好的值得珍視<br />
            我們希望用好的材料 、做好的衣服。<br />
            我們在複雜中追求單純，從舒適感出發，排除繁複的設計<br />
            每件商品在設計上都會有一點小巧思，無論是版型或是繡線，這是我們堅持的細節<br />
            因為我們相信只要用心，就會被看見 。<br />
            在這裡我們提供的不只是服裝，更是專業服務 、誠實與信用<br />
            無須理由的七天鑑賞期，希望妳能夠更輕鬆的與MyMyShop產生第一次接觸。<br />
            2019.5月我們從台灣、從網路出發，在各種挑戰中堅守著不變的初衷<br />
            未來MyMyShop將繼續站在消費者的這一端，為大家製造、推薦嚴選的好商品<br />
            也期盼您的持續支持！
          </a>
        </div>

        <div class="about2">
          <p>品 牌 精 神</p>
          <a
            >在新與舊的激盪、時尚與實用的跨界之中，我們力求平衡<br />
            相信唯有【以人為出發、以品質為根本】的信念才是永續經營之道。<br />
            同時，我們熱愛生命與環境，在2020年開始推出【有機棉】系列<br />
            希望喚起更多消費者重視商品製造的環境議題<br />
            因為我們相信每一次的消費都是為自己想要的世界投票。
          </a>
        </div>
      </div>
    </div>
    <GoTop></GoTop>
  </div>
</template>

<script>

import GoTop from "../GoTop";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`; //'https://vue-course-api.hexschool.io/api/jim55167/products'
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        this.isLoading = false;
        this.products = response.data.products;
      });
    },
  },
  created() {
    this.getProducts();
  },
  components: {
    GoTop,
  },
};
</script>