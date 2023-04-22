<script setup>
import MessageTemplate from "./MessageTemplate.vue";
import { defineProps } from "vue";

const props = defineProps({
  messages: { type: Array, default: () => [] },
});
</script>

<template>
  <div class="comment-list">
    <ul class="comment-list__list">
      <li
        v-for="message in props.messages"
        :key="message.comment_id"
        class="comment-list__comment"
      >
        <message-template :message="message" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.comment-list {
  display: flex;
  justify-content: center;
  width: 100%;

  &__list {
    max-width: 25rem;
  }

  &__comment:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
