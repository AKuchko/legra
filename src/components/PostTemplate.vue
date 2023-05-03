<template>
  <div :id="`post:${props.post.post_id}`" class="post">
    <div v-if="isPostLoaded" class="post__content">
      <div class="post__media">
        <media-viewer :media="props.post.media" />
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
            <p class="post__button-text">{{ post.likes.length }}</p>
          </router-link>
        </div>
        <div v-if="post.caption" class="post__caption">
          {{ post.caption }}
        </div>
      </div>
    </div>
    <div v-else class="post__media">
      <base-preloader />
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { Icon } from "@iconify/vue";
import { useStore } from "vuex";
import BasePreloader from "./common/BasePreloader.vue";
import MediaViewer from "./MediaViewer.vue";
import postService from "@/services/post.service";

const props = defineProps({
  post: { type: Object, default: () => {} },
});
const store = useStore();
const isPostLoaded = computed(() => props.post.media);
const commentRoute = computed(() => {
  return { name: "comments", params: { chat_id: `${props.post.chat_id}` } };
});
const isLikedByMe = computed(() => {
  const myLike = props.post.likes.find(
    (like) => like.user_id === store.getters.userInfo.user_id
  );
  return !!myLike;
});

const addLike = () => {
  postService.likePost({
    post_id: props.post.post_id,
    post_user_id: props.post.user_id,
  });
};
</script>

<style lang="scss">
.post {
  width: 100%;

  &__content {
    margin: auto;
    padding: 0.5rem;
    font-size: $font-small;
    max-width: 25rem;
    background: $color-light-bg;
    border-radius: 0.75rem;
  }

  &__bottom {
    margin-top: 0.5rem;
    padding-left: 0.5rem;
  }

  &__actions {
    display: flex;
    align-items: center;
  }

  &__button {
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
