<script>
/* eslint-disable */
import { ref } from 'vue';
import ForwardWindow from "@/components/ForwardWindow.vue";
import messageService from "@/services/message.service";
import MessageList from '@/components/MessageList.vue';
import MessageInputBox from '@/components/MessageInputBox.vue';
import PostTemplate from "./PostTemplate.vue";
import ChatHeader from './ChatHeader.vue';

export default {
  name: "ChatTemplate",
  components: { MessageList, MessageInputBox, PostTemplate, ForwardWindow, ChatHeader },
  props: {
    messages: { type: Array, default: () => [] },
    commentsPost: { type: Object, default: () => {} },
    meta: { type: Object, default: {} },
    chat_id: { type: Number },
    chat: { type: Object, default: () => {} },
    userRole: { type: String },
  },
  setup(props) {
    const replyed_message = ref(null)
    const sendMessage = ({ message, media, embeded_message, type }) => {
      switch (type) {
        case "message":
          messageService.postMessage({ chat_id: props.chat_id, message, media, meta: props.meta });
          break;
        case "reply":
          messageService.postMessage({ chat_id: props.chat_id, message, media, reply_message_id: embeded_message.message_id, meta: props.meta });
          break;
        case "edit": 
          messageService.editMessage({ chat_id: props.chat_id, message_id: embeded_message.message_id, message });
          break;
      }
    };
    const set_reply_message = ({ message_id }) => (replyed_message.value = props.messages.find((msg) => msg.message_id === message_id));

    return {
      replyed_message,
      set_reply_message,
      sendMessage,
    }
  },
}
</script>

<template>
  <div class="chat">
    <forward-window />
    <div class="chat__wrapper">
      <chat-header :chat-name="chat.chat_name" :chatImage="chat.chat_image" />
      <div class="chat__body">
        <message-list 
            :messages="messages" 
            :user-role="userRole" 
        >
          <post-template v-if="commentsPost"  :post="commentsPost" />
        </message-list>
      </div>
      <div class="chat__bottom">
        <div class="chat__bottom-wrapper">
          <message-input-box @send-message="sendMessage" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.chat {
  position: relative;
  width: 100%;
  height: 100%;

  &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
  }

  &__body {
    width: 100%;
    padding-bottom: 5rem;
    overflow-y: scroll;
    overflow-x: hidden;
    flex-grow: 1;
  }

  &__bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 1rem 0 0;
    background: linear-gradient(0deg, $color-light-bg 50%, rgba(48,48,48,0) 100%);
    z-index: 55;

    @media (prefers-color-scheme: dark) {
      background: linear-gradient(0deg, $color-dark-bg 50%, rgba(48,48,48,0) 100%);
    }
  }

  &__bottom-wrapper {
    margin: auto;
    max-width: 45rem;
  }
}
</style>