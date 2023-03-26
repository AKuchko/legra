<template>
  <div class="me">
    <BaseBlock class="me__header">
      <BaseProfileImage
        :size="75"
        :imageData="userInfo.profile_image"
        class="me__profile-image"
      />
      <div class="me__profile-info">
        <h3 class="me__username">@Username</h3>
        <p class="me__user-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eos
          mollitia sapiente impedet.
        </p>
      </div>
    </BaseBlock>
    <div class="me__content">
      <PostsList :posts="userPosts" v-if="isPostsLoaded" />
      <BasePreloader v-else />
    </div>
  </div>
</template>

<script>
import BaseBlock from "@/components/common/BaseBlock.vue";
import BaseProfileImage from "@/components/common/BaseProfileImage.vue";
import PostsList from "@/components/PostsList.vue";
import BasePreloader from "@/components/common/BasePreloader.vue";
import { mapGetters } from "vuex";

export default {
  name: "MeView",
  components: { BaseBlock, BaseProfileImage, PostsList, BasePreloader },
  data() {
    return {
      isPostsLoaded: false,
    };
  },
  mounted() {
    this.isPostsLoaded = false;
    this.$store
      .dispatch("fetchUserPosts")
      .then(() => {
        this.isPostsLoaded = true;
        console.log("Done", this.isPostsLoaded);
      })
      .catch(() => console.log(this.isPostsLoaded));
  },
  computed: {
    ...mapGetters(["userInfo", "userPosts"]),
  },
};
</script>

<style lang="scss">
.me {
  &__header {
    display: flex;
    align-items: center;
    height: 160px;
    padding: 25px;
    margin-bottom: 25px;
    text-align: left;
  }

  &__profile-image {
    flex-shrink: 0;
    margin-right: 25px;
  }

  &__username {
    margin-bottom: 10px;
  }

  &__user-description {
    font-size: $font-small;
  }
}
</style>
