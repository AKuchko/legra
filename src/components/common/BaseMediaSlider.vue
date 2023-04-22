<template>
  <Swiper class="base-media-slider">
    <SwiperSlide
      v-for="media in props.mediaList"
      :key="media"
      class="base-media-slider__slide"
    >
      <img :src="media" class="base-media-slide__media" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { defineProps } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const props = defineProps({
  mediaList: { type: Array, default: () => [] },
});
</script>

<style lang="scss">
.base-media-slide {
  &__media {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
