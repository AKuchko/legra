<template>
  <div class="me">
    <CreateModal :modalVisibility="modalActive" @close-popup="hidePopup" />
    <ProfileBar class="me__header" :user="userInfo">
      <!-- <UserStats :user_id="userInfo.id" /> -->
    </ProfileBar>
    <BaseButton class="me__create" @click="showPopup">New post +</BaseButton>
    <div class="me__content">
      <PostsList :posts="userPosts" :status="postPreloaderState" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import PostsList from "@/components/PostsList.vue";
  import BaseButton from "@/components/common/BaseButton.vue";
  import ProfileBar from "@/components/ProfileBar.vue";
  import UserStats from "@/components/UserStats.vue";
  import CreateModal from "@/components/CreateModal.vue";
  import { mapGetters, mapActions } from "vuex";
  import preloaderUtil from "@/utils/preloader.util";
  
  export default {
    name: "MeView",
    components: { PostsList, ProfileBar, UserStats, BaseButton, CreateModal },
    data() {
      return {
        postPreloaderState: preloaderUtil,
        modalActive: false,
      }
    },
    mounted() {
      this.fetchPosts()
        .then(() => this.postPreloaderState.setState("loaded"))
        .catch(() => this.postPreloaderState.setState("error"));
    },
    computed: {
      ...mapGetters(["userInfo", "userPosts"]),
    },
    methods: {
      ...mapActions({
        fetchPosts: "fetchUserPosts",
      }),
      showPopup() {
        this.modalActive = true;
        document.querySelector('body').classList.toggle('no-scroll');
      },
      hidePopup() {
        this.modalActive = false;
        document.querySelector('body').classList.toggle('no-scroll');
      }
    },
  };
  </script>
  
  <style lang="scss">
  .me {
    &__header {
        margin-bottom: 25px;
    }

    &__create {
        margin-bottom: 25px;
    }
  }
  </style>
  