<template>
  <div class="user">
    <div class="user__wrapper">
      <create-modal :modalVisibility="modalVisibile" @close-popup="hideModal" />
      <profile-bar class="user__header" :user="props.user" />
      <posts-list :posts="props.posts" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
  import CreateModal from "@/components/CreateModal.vue";
  import PostsList from "@/components/PostsList.vue";
  import ProfileBar from "@/components/ProfileBar.vue";
  import { ref, defineProps, onMounted, onUnmounted } from "vue";

  const modalVisibile = ref(false);
  const openPostCreator = () => (modalVisibile.value = true);
  const hideModal = () => (modalVisibile.value = false);
  
  const props = defineProps({
    user: { type: Object, default: () => {} },
    posts: { type: Array, default: () => [] },
    owner: { type: Boolean, default: false },
  });

  onMounted(() => {
    window.addEventListener("openPostCreator", openPostCreator);
  });
  onUnmounted(() => {
    window.removeEventListener("openPostCreator", openPostCreator);
  })
</script>

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