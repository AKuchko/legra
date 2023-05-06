<script setup>
/* eslint-disable */
import { ref, onMounted, onUnmounted, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import messageService from "@/services/message.service";
// import socket from "@/socket";
import MessageList from '@/components/MessageList.vue';
import MessageInputBox from '@/components/MessageInputBox.vue';
import PostTemplate from "./PostTemplate.vue";

const props = defineProps({
    messages: { type: Array, default: () => [] },
    commentsPost: { type: Object, default: () => {} },
    chat_id: Number,
    userRole: String,
}) 
// const route = useRoute();
const replyed_message = ref(null)

const sendMessage = ({ message, media, embeded_message, type }) => {
  switch (type) {
    case "message":
      messageService.postMessage({ chat_id: props.chat_id, message, media });
      break;

    case "reply":
      messageService.postMessage({ chat_id: props.chat_id, message, media, reply_message_id: embeded_message.message_id });
      break;
  
    case "edit": 
      messageService.editMessage({ chat_id: props.chat_id, message_id: embeded_message.message_id, message });
      break;
  }
};
const set_reply_message = ({ message_id }) => (replyed_message.value = messages.value.find((msg) => msg.message_id === message_id));

// HOOKS
// onMounted(async () => {
// //   messages.value = await messageService.getMessages({ chat_id }).then((r) => r.data);
// //   user_chat_role.value = await messageService.getUserChatRole({ chat_id }).then((r) => r.data.user_role);
//   socket.on(`message:add:${chat_id}`, addMessage);
//   socket.on(`message:delete:${chat_id}`, removeMessage); 
//   socket.on(`message:edit:${chat_id}`, editMessage);
// });
// onUnmounted(() => {
//   socket.off(`message:add:${chat_id}`);
//   socket.off(`message:delete:${chat_id}`); 
// });
</script>

<template>
  <div class="chat">
    <div class="chat__wrapper">
      <div class="chat__header"></div>
      <div class="chat__body">
        <message-list 
            :messages="props.messages" 
            :user-role="props.userRole" 
            @reply_to="set_reply_message"
        >
          <li v-if="props.commentsPost">
            <post-template :post="props.commentsPost" />
          </li>
        </message-list>
      </div>
      <div class="chat__bottom">
        <message-input-box 
            :reply_msg="replyed_message" 
            @send-message="sendMessage"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.chat {
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
    margin-bottom: 0.3rem;
    overflow-y: scroll;
  }

  &__bottom {
    width: calc(100% - 25vw);
    max-width: 35rem;
  }
}
</style>