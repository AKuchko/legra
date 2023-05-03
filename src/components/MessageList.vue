<script setup>
import MessageTemplate from "./MessageTemplate.vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  messages: { type: Array, default: () => [] },
  privileges: { type: String, default: "customer" },
});
const emit = defineEmits(["reply_to"]);

const reply_to = (message_id) => {
  emit("reply_to", message_id);
};
</script>

<template>
  <div class="message-list">
    <ul class="message-list__list">
      <li
        v-for="message in props.messages"
        :key="message.message_id"
        class="message-list__message"
      >
        <message-template
          :message="message"
          :privileges="props.privileges"
          @reply="reply_to"
        />
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
