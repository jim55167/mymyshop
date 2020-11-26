<template>
    <div>
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide class="swiper-slide games"
          v-for="item in imgs" :key="item">
          <img v-lazy="item" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
</template>

<script>

export default {
    name: 'Banner',
    data() {
        return {
          imgs: [
            require('../assets/banner/t1.jpg'),
            require('../assets/banner/t2.jpg'),
            require('../assets/banner/t3.jpg'),
            require('../assets/banner/t4.jpg'),
            require('../assets/banner/t5.jpg'),
            require('../assets/banner/t6.jpg'),
            require('../assets/banner/t7.jpg'),
            require('../assets/banner/t8.jpg'),
            require('../assets/banner/t9.jpg'),
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
            }
        }
    },
    methods: {
      getSwiper(num) {
        this.$emit('event', num);
      }
    },
  };


</script>