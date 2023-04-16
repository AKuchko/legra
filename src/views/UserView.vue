<template>
  <transition-slide>
    <user-account v-show="showUserAccount" :user="user" :posts="posts" />
  </transition-slide>
  <router-view v-slot="{ Component }">
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

import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "UserView",
  components: { TransitionSlide, UserAccount },
  setup() {
    const route = useRoute();
    const user = ref({});
    const posts = ref([]);
    const showUserAccount = computed(() => !route.params.post_id);

    let user_id = route.params.user_id;

    function updateUser() {
      userService.fetchUserInfo({ user_id }).then((user_info) => {
        user.value = user_info.data;
      });

      postService.fetchUserPosts({ user_id }).then((user_posts) => {
        posts.value = user_posts.data;
      });
    }

    const unwatch = watch(route, () => {
      user_id = route.params.user_id;
      if (!user_id) return;
      setTimeout(() => {
        updateUser();
      }, 150);
    });

    onMounted(() => {
      updateUser();
    });

    onBeforeUnmount(() => {
      unwatch();
    });

    return {
      user,
      posts,
      showUserAccount,
    };
  },
};
</script>
