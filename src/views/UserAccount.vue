<template>
  <div class="user">
    <div class="user__wrapper">
      <profile-bar class="user__header" :user="props.user" />
      <posts-list :posts="props.posts" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
  import PostsList from "@/components/PostsList.vue";
  import ProfileBar from "@/components/ProfileBar.vue";
  import { ref, defineProps } from "vue";
  
  const props = defineProps({
    user: { type: Object, default: () => {} },
    posts: { type: Array, default: () => [] },
  });
</script>

<style lang="scss">
  .user {
    display: flex;
    justify-content: center;
    width: 100%;
    overflow-y: scroll;
  }
</style>