<script>
/* eslint-disable */
import CreateModal from "@/components/CreateModal.vue";
import PostsList from "@/components/PostsList.vue";
import ProfileBar from "@/components/ProfileBar.vue";
import postService from "@/services/post.service";
import userService from "@/services/user.service";
import socket from "@/socket";
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "UserView",
  components: { CreateModal, PostsList, ProfileBar },
  async setup() {
    const modalVisibile = ref(false);
    const openPostCreator = () => (modalVisibile.value = true);
    const hideModal = () => (modalVisibile.value = false);
    const user = ref({});
    const posts = ref([]);
    const store = useStore();
    const route = useRoute();
    const deletePost = (e) => {
      const post = e.detail.target;
      postService.deletePost({ post_id: post.post_id });
    };

    let user_id = route.params.user_id;

    const isMyAccount = computed(() => (store.getters.userInfo.user_id === user_id));

    onMounted(() => {
      window.addEventListener("post-delete", deletePost);
      window.addEventListener("openPostCreator", openPostCreator);
      socket.on(`user:edit:${user.value.user_id}`, ({ field, value }) => (user.value[field] = value));
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
      window.removeEventListener("openPostCreator", openPostCreator);
      socket.off(`user:edit:${user.value.user_id}`);
      socket.off(`post:like:${user.value.user_id}`);
    })

    watch(route, () => {
      const new_user_id = route.params.user_id;
      if (!new_user_id || new_user_id === user_id) return;
      user_id = new_user_id;
      setTimeout(async () => {
        await userService.fetchUserInfo({ user_id }).then((r) => (user.value = r.data));
        await postService.fetchUserPosts({ user_id }).then((r) => (posts.value = r.data));
      }, 150);
    });

    await userService.fetchUserInfo({ user_id }).then((r) => (user.value = r.data));
    await postService.fetchUserPosts({ user_id }).then((r) => (posts.value = r.data));

    return {
      user,
      posts,
      isMyAccount,
      modalVisibile,
      hideModal,
    }
  },
}
</script>

<template>
  <div class="user">
    <div class="user__wrapper">
      <create-modal :modalVisibility="modalVisibile" @close-popup="hideModal" />
      <profile-bar class="user__header" :user="user" />
      <posts-list :posts="posts" />
    </div>
  </div>
</template>

<style lang="scss">
  .user {
    width: 100%;
    overflow-y: scroll;

    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__header {
      margin-bottom: 1rem;
    }
  }
</style>