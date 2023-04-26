<script setup>
import TransitionSlide from "@/components/TransitionSlide.vue";
import UserAccount from "./UserAccount.vue";
import postService from "@/services/post.service";
import userService from "@/services/user.service";

import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const user = ref({});
const posts = ref([]);
const store = useStore();

let user_id = route.params.user_id;

const showUserAccount = computed(() => !route.params.post_id);
const isMyAccount = computed(() => store.getters.userInfo.user_id === user_id);

function fetchAccount() {
  userService.fetchUserInfo({ user_id }).then((user_info) => {
    user.value = user_info.data;
  });

  postService.fetchUserPosts({ user_id }).then((user_posts) => {
    posts.value = user_posts.data;
  });
}

watch(route, () => {
  user_id = route.params.user_id;

  if (!user_id) return;

  setTimeout(() => {
    fetchAccount();
  }, 150);
});

onMounted(() => {
  fetchAccount();
});
</script>

<template>
  <transition-slide>
    <user-account
      v-show="showUserAccount"
      :user="user"
      :posts="posts"
      :owner="isMyAccount"
    />
  </transition-slide>
  <router-view v-slot="{ Component }">
    <transition-slide>
      <component :is="Component" />
    </transition-slide>
  </router-view>
</template>
