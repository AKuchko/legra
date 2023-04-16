<template>
  <div class="user">
    <div class="user__wrapper">
      <ProfileBar class="user__header" :user="user" />
      <PostsList :posts="posts" :status="postsPrelodaer" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import PostsList from "@/components/PostsList.vue";
  import ProfileBar from "@/components/ProfileBar.vue";
  import preloaderUtil from "@/utils/preloader.util";
  import { ref, onMounted } from "vue";
  
  export default {
    name: "UserAccount",
    components: { PostsList, ProfileBar },
    props: {
      user: { type: Object, default: () => {} },
      posts: { type: Array, default: () => [] },
    },
    setup() {
      const postsPrelodaer = ref(new preloaderUtil());

      onMounted(() => {
        postsPrelodaer.value.setState("loaded");
      })

      return {
        postsPrelodaer,
      };
    },
  };
  </script>

  <style>
  .user {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  </style>