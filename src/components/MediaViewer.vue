<script setup>
import BaseMediaSlider from "./common/BaseMediaSlider.vue";
import { defineProps, computed } from "vue";

const props = defineProps({
  media: { type: Array, default: () => [] },
});
const isMediaMultiple = computed(() => props.media.length > 1);
</script>

<template>
  <div class="media-viewer">
    <div v-if="!isMediaMultiple" class="media-viewer__simple-view">
      <img :src="props.media[0].data" class="media-viewer__image" />
    </div>
    <div v-else class="media-viewer__slider">
      <base-media-slider :mediaList="props.media" />
    </div>
  </div>
</template>

<style lang="scss">
.media-viewer {
  width: 100%;
  height: 100%;

  &__simple-view {
    border-radius: 0.25rem;
    overflow: hidden;

    img {
      width: 100%;
      object-fit: contain;
    }
  }
}
</style>
