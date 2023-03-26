<template>
  <ul class="posts-list" :class="listType" v-if="posts">
    <li class="posts-list__post" v-for="post in posts" :key="post.id">
      <PostTemplate
        :image="post.image"
        :isMiniature="isMiniature"
        :note="post.note"
        @click="($event) => (isMiniature = !isMiniature)"
      />
    </li>
  </ul>
  <div class="posts-list__empty" v-else></div>
</template>

<script>
import PostTemplate from "./PostTemplate.vue";

export default {
  name: "PostsList",
  components: { PostTemplate },
  props: {
    posts: { type: Array, default: () => [] },
  },
  data() {
    return {
      isMiniature: true,
    };
  },
  computed: {
    listType() {
      return this.isMiniature ? "posts-list--mini" : "";
    },
  },
};
</script>

<style lang="scss">
.posts-list {
  display: grid;
  grid-template-columns: minmax(50px, 100%);
  transition: $transition-base;

  &__post {
    margin-bottom: 25px;
  }
}

.posts-list--mini {
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, 12.4rem));
  grid-gap: 5px;
  width: 100%;
}

.posts-list--mini .posts-list__post {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 12.25rem;
  max-height: 12.25rem;
  background-color: $color-placeholder;
  overflow: hidden;
  margin-bottom: 0;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
