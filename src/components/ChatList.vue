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
    <ul v-if="chats.length" class="chat-list__wrapper secondary">
      <li
        v-for="chat in chats"
        :key="chat.chat_id"
        class="chat-list__chat-resume"
      >
        <chat-resume :chatInfo="chat" />
      </li>
    </ul>
    <div v-else class="chat-list__empty-list">
      <h2>Chat list is empty</h2>
    </div>
  </div>
</template>

<style lang="scss">
.chat-list {
  &__wrapper {
    padding: 0.2rem;
    max-width: 30rem;
    border-radius: 0.5rem;
    min-width: 45.5rem;
  }

  &__empty-list {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 45.5rem;
    height: 100%;
  }
}
</style>
