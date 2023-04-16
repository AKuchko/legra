<template>
  <div class="user">
    <div class="user__wrapper">
      <ProfileBar class="user__header" :user="props.user" />
      <PostsList :posts="props.posts" :status="postsPrelodaer" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
  import PostsList from "@/components/PostsList.vue";
  import ProfileBar from "@/components/ProfileBar.vue";
  import preloaderUtil from "@/utils/preloader.util";

  import { ref, onMounted, defineProps } from "vue";
  
  const postsPrelodaer = ref(new preloaderUtil());
  const props = defineProps({
    user: { type: Object, default: () => {} },
    posts: { type: Array, default: () => [] },
  });

  onMounted(() => {
    postsPrelodaer.value.setState("loaded");
  })
</script>

<style>
  .user {
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>