<script>
import ChatResume from "./ChatResume.vue";

export default {
  name: "ChatList",
  components: { ChatResume },
  props: {
    chats: { type: Array, default: () => [] },
  },
};
</script>

<template>
  <div class="chat-list">
    <ul class="chat-list__wrapper">
      <li
        v-for="chat in chats"
        :key="chat.chat_id"
        class="chat-list__chat-resume"
      >
        <chat-resume :chatInfo="chat" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.chat-list {
  &__wrapper {
    padding: 0.2rem;
    max-width: 30rem;
    border-radius: 0.5rem;
    background: $color-light-bg;
  }
}
</style>
