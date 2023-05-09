<script setup>
import MessageTemplate from "./MessageTemplate.vue";
import { defineProps } from "vue";

const props = defineProps({
  messages: { type: Array, default: () => [] },
  userRole: { type: String, default: "customer" },
});
</script>

<template>
  <div class="message-list">
    <ul class="message-list__list">
      <li class="message-list__message">
        <slot></slot>
      </li>
      <li
        v-for="message in props.messages"
        :key="message.message_id"
        class="message-list__message"
      >
        <message-template :message="message" :user-role="props.userRole" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.message-list {
  width: 100%;

  &__list {
    margin: 0 auto;
    padding: 1rem 1rem 0 1.125rem;
    max-width: 45.5rem;
  }
}
</style>
