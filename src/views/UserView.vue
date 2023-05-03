<script setup>
import TransitionSlide from "@/components/transitions/TransitionSlide.vue";
import UserAccount from "./UserAccount.vue";
import postService from "@/services/post.service";
import userService from "@/services/user.service";
import socket from "@/socket";

import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const user = ref({});
const posts = ref([]);
const store = useStore();

let user_id = route.params.user_id;

const showUserAccount = computed(() => !route.params.chat_id);
const isMyAccount = computed(() => store.getters.userInfo.user_id === user_id);

async function fetchAccount() {
  await userService.fetchUserInfo({ user_id }).then((user_info) => {
    user.value = user_info.data;
  });

  await postService.fetchUserPosts({ user_id }).then((user_posts) => {
    posts.value = user_posts.data;
  });
}

watch(route, () => {
  const new_user_id = route.params.user_id;

  if (!new_user_id || new_user_id === user_id) return;
  user_id = new_user_id;
  setTimeout(() => {
    fetchAccount();
  }, 150);
});

onMounted(async () => {
  await userService.fetchUserInfo({ user_id }).then((user_info) => {
    user.value = user_info.data;
  });

  await postService.fetchUserPosts({ user_id }).then((user_posts) => {
    posts.value = user_posts.data;
  });

  socket.on(`post:like:${user.value.user_id}`, ({ post_id, action, user }) => {
    const postToUpdate = posts.value.find((post) => post.post_id === post_id);

    if (action === "unlike") {
      postToUpdate.likes = postToUpdate.likes.filter(
        (like) => like.user_id !== user.user_id
      );
    } else postToUpdate.likes.push(user);
  });
});
onUnmounted(() => {
  socket.off(`post:like:${user.value.user_id}`);
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
