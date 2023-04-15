<template>
  <ul class="comment-list">
    <li
      v-for="comment in comments"
      :key="comment.comment_id"
      class="comment-list__comment"
    >
      <comment-template :comment="comment" />
    </li>
  </ul>
</template>

<script>
import CommentTemplate from "./CommentTemplate.vue";

export default {
  name: "CommentList",
  components: { CommentTemplate },
  props: {
    comments: { type: Array, default: () => [] },
  },
};
</script>

<style lang="scss" scoped>
.comment-list {
  &__comment:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
