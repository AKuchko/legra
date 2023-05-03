<template>
  <div class="user">
    <div class="user__wrapper">
      <create-modal
        :modalVisibility="modalVisibile"
        @close-popup="modalVisibile = false"
      />
      <profile-bar class="user__header" :user="props.user" />
      <base-button @click="showModal">create</base-button>
      <posts-list :posts="props.posts" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
  import CreateModal from "@/components/CreateModal.vue";
  import PostsList from "@/components/PostsList.vue";
  import ProfileBar from "@/components/ProfileBar.vue";
  import BaseButton from "@/components/common/BaseButton.vue";
  import { ref, defineProps } from "vue";

  const modalVisibile = ref(false);
  const showModal = () => (modalVisibile.value = true);
  // const hideModal = () => (modalVisibile.value = false);
  
  const props = defineProps({
    user: { type: Object, default: () => {} },
    posts: { type: Array, default: () => [] },
    owner: { type: Boolean, default: false },
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