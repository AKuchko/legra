<template>
  <div class="post">
    <div class="post__content">
      <div v-if="isPostLoaded" class="post__media">
        <media-viewer :media="props.post.media" />
      </div>
      <div v-else class="post__media">
        <base-preloader />
      </div>
      <div class="post__bottom">
        <div class="post__actions">
          <div class="post__button">
            <Icon icon="ph:heart" width="25" />
            <p class="post__button-text">{{ post.likes }} likes</p>
          </div>
          <router-link :to="commentRoute" class="post__button">
            <Icon icon="ph:chat-teardrop" width="25" />
          </router-link>
        </div>
        <div class="post__caption">
          {{ post.caption }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { Icon } from "@iconify/vue";
import BasePreloader from "./common/BasePreloader.vue";
import MediaViewer from "./MediaViewer.vue";

const props = defineProps({
  post: { type: Object, default: () => {} },
});
const isPostLoaded = computed(() => props.post.media);
const commentRoute = computed(() => {
  return { name: "comments", params: { post_id: `${props.post.post_id}` } };
});
</script>

<style lang="scss">
.post {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  &__content {
    padding: 10px;
    font-size: $font-small;
    max-width: 25rem;
    background: black;
    border-radius: 15px;
  }

  &__media {
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
  }

  &__bottom {
    padding: 10px;
  }

  &__media-inner {
    width: 100%;
    height: 100%;
  }

  &__actions {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
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
    text-align: left;
  }
}
</style>
