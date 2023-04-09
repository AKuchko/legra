<template>
  <ul v-if="status.loading" class="posts-list posts-list--preloading">
    <li
      v-for="preloader in [1, 2, 3, 4]"
      :key="preloader"
      class="posts-list__preloader"
    ></li>
  </ul>
  <ul v-else-if="status.loaded" class="posts-list">
    <li v-for="post in posts" :key="post.id" class="posts-list__post">
      <PostTemplate :post="post" />
    </li>
  </ul>
  <div v-else-if="status.loaded & !posts" class="posts-list posts-list--empty">
    <p>There is no posts</p>
  </div>
  <div v-else-if="status.error" class="posts-list post-list--error">
    <p>Somthing went wrong ...</p>
  </div>
</template>

<script>
import PostTemplate from "./PostTemplate.vue";

export default {
  name: "PostsList",
  components: { PostTemplate },
  props: {
    posts: { type: Array, default: () => [] },
    status: { type: Object, default: () => {} },
  },
};
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
