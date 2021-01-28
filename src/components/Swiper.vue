<template>
  <div>
    <Swiper class="swiper" :options="swiperOption">
      <swiper-slide class="swiper-slide games" v-for="item in imgs" :key="item">
        <img :src="item" alt="banner" style="object-fit: cover" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </Swiper>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data () {
    return {
      imgs: [
        require('@/assets/banner/t2.jpg'),
        require('@/assets/banner/t1.jpg'),
        require('@/assets/banner/t3.jpg'),
        require('@/assets/banner/t4.jpg'),
        require('@/assets/banner/t6.jpg'),
        require('@/assets/banner/t7.jpg'),
        require('@/assets/banner/t8.jpg')
      ],
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  methods: {
    getSwiper (num) {
      this.$emit('event', num)
    }
  }
}
</script>
