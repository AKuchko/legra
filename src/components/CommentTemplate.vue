<template>
  <div class="comment" :class="{ 'comment--me': isMyComment }">
    <router-link class="comment__profile-image" :to="userLink">
      <BaseProfileImage :size="30" :imageData="props.comment.profile_image" />
    </router-link>
    <div class="comment__content">
      <p class="comment__nickname">{{ props.comment.user_name }}</p>
      <p class="comment__text">{{ props.comment.comment_text }}</p>
    </div>
  </div>
</template>

<script setup>
import BaseProfileImage from "./common/BaseProfileImage.vue";

import { computed, defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
  comment: { type: Object, default: () => {} },
});

const userInfo = computed(() => store.getters.userInfo);
const isMyComment = computed(
  () => userInfo.value.user_id === props.comment.user_id
);
const userLink = computed(() => ({
  name: "user",
  params: { user_id: props.comment.user_id },
}));
</script>

<style lang="scss">
.comment {
  display: flex;
  font-size: $font-small;

  &__content {
    padding: 10px;
    border-radius: 10px;
    text-align: left;
    background: #ececec;
  }

  &__nickname {
    margin-bottom: 5px;
    font-size: $font-xsmall;
  }

  &__profile-image {
    margin: auto 10px 0 0;
  }
}

.comment--me {
  flex-direction: row-reverse;

  .comment__profile-image {
    margin: auto 0 0 10px;
  }

  .comment__content {
    color: $color-light;
    background: $color-accent;
  }
}
</style>
