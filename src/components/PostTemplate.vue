<script>
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import { useStore } from "vuex";
import MediaViewer from "./MediaViewer.vue";
import BaseProfileImage from "./common/BaseProfileImage.vue";
import DropDownMenu from "./DropDownMenu.vue";
import postService from "@/services/post.service";
import PostPrivileges from "@/utils/PostPrivileges";

export default {
  name: "PostTemplate",
  components: { MediaViewer, Icon, BaseProfileImage, DropDownMenu },
  props: {
    post: { type: Object, default: () => {} },
  },
  setup(props) {
    const store = useStore();
    const user_id = store.getters.userInfo.user_id;
    const isPostLoaded = computed(() => props.post.media);
    const commentRoute = computed(() => {
      return { name: "comments", params: { post_id: `${props.post.post_id}` } };
    });
    const menu = computed(() => {
      if (user_id === props.post.user_id) return PostPrivileges.ownerPriviliges;
      return PostPrivileges.customerPrivileges;
    });
    const isLikedByMe = computed(() => {
      const myLike = props.post.likes.find((like) => like.user_id === user_id);
      return !!myLike;
    });
    const addLike = () => {
      postService.likePost({
        post_id: props.post.post_id,
        post_user_id: props.post.user_id,
      });
    };

    return {
      menu,
      isPostLoaded,
      commentRoute,
      isLikedByMe,
      addLike,
    };
  },
};
</script>

<template>
  <div :id="`post:${post.post_id}`" class="post">
    <div class="post__content secondary">
      <div class="post__header">
        <div class="post__owner">
          <router-link
            :to="{ name: 'user', params: { user_id: post.user_id } }"
          >
            <BaseProfileImage
              :imageData="post.profile_image"
              :user_name="post.user_name"
              :size="32"
            />
          </router-link>
          <p class="post__user-name">{{ post.user_name }}</p>
        </div>
        <div class="post__actions">
          <DropDownMenu :menu="menu" :target="post" />
        </div>
      </div>
      <div class="post__body">
        <div class="post__media">
          <media-viewer :media="post.media" />
        </div>
      </div>
      <div class="post__bottom">
        <div class="post__actions">
          <div class="post__button" @click="addLike">
            <Icon
              icon="ph:heart"
              width="25"
              :style="{ color: isLikedByMe ? 'red' : '' }"
            />
            <p class="post__button-text">{{ post.likes.length }}</p>
          </div>
          <router-link :to="commentRoute" class="post__button">
            <Icon icon="ph:chat-teardrop" width="25" />
            <p class="post__button-text">{{ post.comments_count }}</p>
          </router-link>
        </div>
        <div v-if="post.caption" class="post__caption">
          <p>{{ post.caption }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.post {
  width: 100%;

  &__content {
    max-width: 25rem;
    margin: auto;
    padding: 0 0.5rem;
    font-size: $font-small;
    border-radius: 0.75rem;
  }

  &__header {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
  }

  &__owner {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  &__user-name {
    margin-left: 0.25rem;
  }

  &__bottom {
    padding: 0.5rem 0;
    padding-left: 0.5rem;
  }

  &__actions {
    display: flex;
    align-items: center;
  }

  &__button {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-right: 25px;
  }

  &__button-text {
    margin-left: 5px;
  }

  &__caption {
    margin-top: 0.5rem;
    text-align: left;
  }
}
</style>
