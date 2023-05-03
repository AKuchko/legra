<template>
  <ul class="posts-list">
    <li v-for="post in props.posts" :key="post.id" class="posts-list__post">
      <PostTemplate :post="post" />
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from "vue";
import PostTemplate from "./PostTemplate.vue";

const props = defineProps({
  posts: { type: Array, default: () => [] },
});
</script>

<style lang="scss">
.posts-list {
  display: grid;
  grid-template-columns: minmax(160px, 25rem);

  &__post {
    margin-bottom: 25px;
  }

  &--preloading {
    display: grid;
    grid-template-columns: repeat(3, minmax(50px, 12.4rem));
    grid-template-rows: repeat(2, minmax(50px, 12.4rem));
    grid-gap: 5px;
    width: 100%;
  }

  &__preloader {
    max-width: 12.4rem;
    max-height: 12.4rem;
    background: $color-placeholder;
    animation-duration: 1s;
    animation-name: preloader_anim;
    animation-iteration-count: infinite;
  }
}

@keyframes preloader_anim {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
