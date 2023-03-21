<template>
  <ul class="posts-list posts-list--mini">
    <li class="posts-list__post" v-for="post in posts" :key="post.id">
      <img :src="`data:image/jpeg;base64,${post.image}`" alt="Image" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "PostsList",
  props: {
    posts: { type: Array, default: () => [] },
  },
};
</script>

<style lang="scss">
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

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
