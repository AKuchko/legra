<!-- <script setup>
/* eslint-disable */
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import messageService from "@/services/message.service";
import socket from "@/socket";
import MessageList from '@/components/MessageList.vue';
import MessageInputBox from '@/components/MessageInputBox.vue';

// VARS
const route = useRoute();
const chat_id = route.params.chat_id;
const messages = ref([]);
const user_chat_role = ref('')
const replyed_message = ref(null)

// FUNCTIONS
const sendMessage = ({ message_text, message_media, embeded_message, type }) => {
  switch (type) {
    case "message":
      messageService.postMessage({ chat_id, message_text, message_media });
      break;

    case "reply":
      messageService.postMessage({ chat_id, message_text, message_media, reply: embeded_message.message_id });
      break;
  
    case "edit": 
      messageService.editMessage({ chat_id, message_id: embeded_message.message_id, message_text });
      break;
  }
};
const addMessage = (message) => (messages.value.push(message));
const removeMessage = ({ message_id }) => (messages.value = messages.value.filter((message) => message.message_id != message_id));
const editMessage = ({ message_id, fields_to_edit}) => {
  const msg_to_edit = messages.value.find((msg) => msg.message_id === message_id);
  for (let field in fields_to_edit) {
    msg_to_edit[field] = fields_to_edit[field];
  }
};
const set_reply_message = ({ message_id }) => (replyed_message.value = messages.value.find((msg) => msg.message_id === message_id));

// HOOKS
onMounted(async () => {
  messages.value = await messageService.getMessages({ chat_id }).then((r) => r.data);
  user_chat_role.value = await messageService.getUserChatRole({ chat_id }).then((r) => r.data.user_role);
  socket.on(`message:add:${chat_id}`, addMessage);
  socket.on(`message:delete:${chat_id}`, removeMessage); 
  socket.on(`message:edit:${chat_id}`, editMessage);
});
onUnmounted(() => {
  socket.off(`message:add:${chat_id}`);
  socket.off(`message:delete:${chat_id}`); 
});
</script>

<template>
  <div class="chat">
    <div class="chat__wrapper">
      <div class="chat__header"></div>
      <div class="chat__body">
        <message-list :messages="messages" :privileges="user_chat_role" @reply_to="set_reply_message" />
      </div>
      <div class="chat__bottom">
        <message-input-box :reply_msg="replyed_message" @send-message="sendMessage" />
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
</style> -->
