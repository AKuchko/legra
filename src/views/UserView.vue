<template>
  <div class="user">
    <ProfileBar class="user__header" :user="user">
      <UserStats :user_id="user.user_id" />
    </ProfileBar>
    <PostsList :posts="posts" :status="postPreloaderState" />
  </div>
</template>

<script>
/* eslint-disable */ 
import PostsList from "@/components/PostsList.vue";
import BasePreloader from "@/components/common/BasePreloader.vue";
import ProfileBar from "@/components/ProfileBar.vue";
import UserStats from "@/components/UserStats.vue";
import postService from "@/services/post.service";
import userService from "@/services/user.service";
import preloaderUtil from "@/utils/preloader.util";

export default {
  name: "UserView",
  components: { PostsList, BasePreloader, ProfileBar, UserStats },
  data() {
    return {
      user_id: null,
      user: {},
      posts: [],
      postPreloaderState: preloaderUtil,
      userPreloaderState: null,
    };
  },
  mounted() {
    this.user_id = this.$route.params.id;

    // Достаем информацию о пользователе
    userService.fetchUserInfo({ user_id: this.user_id })
      .then(user_info => {
        this.user = user_info.data
        // this.userPreloaderState.setState("loaded")
      })
      .catch(() => {
        // this.userPreloaderState.setState("error")
      });
    
    // Достаем посты пользователя
    postService.fetchUserPosts({ user_id: this.user_id })
      .then(user_posts => {
        this.posts = user_posts.data
        this.postPreloaderState.setState('loaded')
      })
      .catch(() => {
        this.postPreloaderState.setState('error')
      });
  },
};
</script>

<style lang="scss">
.user {
}
</style>
