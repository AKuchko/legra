<script>
import BaseProfileImage from "./common/BaseProfileImage.vue";
import { ref } from "vue";
export default {
  name: "ChatResume",
  components: { BaseProfileImage },
  props: {
    chatInfo: { type: Object, default: () => {} },
  },
  setup(props) {
    const chatLink = ref({
      name: "chat",
      params: { user_id: props.chatInfo.user_id },
    });
    return {
      chatLink,
    };
  },
};
</script>

<template>
  <router-link :to="chatLink" class="chat-resume">
    <base-profile-image
      :imageData="chatInfo.chat_image"
      :user_name="chatInfo.chat_name"
    />
    <div class="chat-resume__body">
      <div class="chat-resume__info-row">
        <h3>{{ chatInfo.chat_name }}</h3>
        <div class="separator"></div>
        <div class="chat-resume__last-msg-meta">
          <span class="chat-resume__time">{{
            chatInfo.last_message.created
          }}</span>
        </div>
      </div>
      <div class="chat-resume__subtitle">
        <span>{{ chatInfo.last_message.message }}</span>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss">
.chat-resume {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: $transition-base;

  &:hover {
    background: rgba($color: #000000, $alpha: 0.1);
  }

  &__body {
    flex: 1;
    text-align: left;
    line-height: 1.5rem;
    margin-left: 0.5rem;

    span {
      font-size: 0.875rem;
    }
  }

  &__info-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;

    h3 {
      color: #222;
    }

    .separator {
      flex-grow: 1;
    }
  }
}
</style>
