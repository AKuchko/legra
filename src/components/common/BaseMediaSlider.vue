<template>
  <Swiper class="base-media-slider" :modules="[Pagination]" pagination>
    <SwiperSlide
      v-for="media in props.mediaList"
      :key="media"
      class="base-media-slider__slide"
    >
      <img :src="media" class="base-media-slider__media" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { defineProps } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const props = defineProps({
  mediaList: { type: Array, default: () => [] },
});
</script>

<style lang="scss">
.base-media-slider {
  &__slide {
    border-radius: 8px;
    overflow: hidden;
  }

  &__media {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-pagination-bullet-active {
    background: $color-light;
  }
}
</style>
