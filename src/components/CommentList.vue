<script setup>
  import CommentTemplate from "./CommentTemplate.vue";
  import { defineProps } from "vue";

  const props = defineProps({
    comments: { type: Array, default: () => [] },
  });
</script>

<template>
  <ul class="comment-list">
    <li
      v-for="comment in props.comments"
      :key="comment.comment_id"
      class="comment-list__comment"
    >
      <comment-template :comment="comment" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.comment-list {
  &__comment:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
