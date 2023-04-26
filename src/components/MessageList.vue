<script setup>
import MessageTemplate from "./MessageTemplate.vue";
import { defineProps } from "vue";

const props = defineProps({
  messages: { type: Array, default: () => [] },
});
</script>

<template>
  <div class="message-list">
    <ul class="message-list__list">
      <li
        v-for="message in props.messages"
        :key="message.message_id"
        class="message-list__message"
      >
        <message-template :message="message" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.message-list {
  display: flex;
  justify-content: center;
  width: 100%;

  &__list {
    max-width: 25rem;
  }

  &__message:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
