<template>
  <router-view v-slot="{ Component }" :user="user" :posts="posts">
    <transition-slide>
      <component :is="Component" />
    </transition-slide>
  </router-view>
</template>

<script>
import TransitionSlide from "@/components/TransitionSlide.vue";
import UserAccount from "./UserAccount.vue";
import postService from "@/services/post.service";
import userService from "@/services/user.service";

export default {
  name: "UserView",
  components: { TransitionSlide, UserAccount },
  data() {
    return {
      user_id: null,
      user: {},
      posts: [],
    };
  },
  mounted() {
    this.user_id = this.$route.params.user_id;

    // Достаем информацию о пользователе
    userService
      .fetchUserInfo({ user_id: this.user_id })
      .then((user_info) => {
        this.user = user_info.data;
        // this.userPreloaderState.setState("loaded")
      })
      .catch(() => {
        // this.userPreloaderState.setState("error")
      });

    // Достаем посты пользователя
    postService.fetchUserPosts({ user_id: this.user_id }).then((user_posts) => {
      this.posts = user_posts.data;
    });
  },
};
</script>
