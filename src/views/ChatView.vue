<script>
/* eslint-disable */
import ChatTemplate from "@/components/ChatTemplate.vue";
import messageService from "@/services/message.service";
import chatService from "@/services/chat.service";
import socket from "@/socket";
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "ChatView",
  components: { ChatTemplate },
  async setup() {
    const route = useRoute();
    const userRole = ref("admin");
    const chat = ref({});
    const user_id = route.params.user_id;
    const meta = ref({ chat_type: "personal", to: user_id })

    const addMessage = (message) => (chat.value.messages.push(message));
    const removeMessage = ({ message_id }) => (chat.value.messages = chat.value.messages.filter((message) => message.message_id != message_id));
    const editMessage = ({ message_id, fields_to_edit}) => {
      const msg_to_edit = chat.value.messages.find((msg) => msg.message_id === message_id);
      for (let field in fields_to_edit) {
        msg_to_edit[field] = fields_to_edit[field];
      }
    };
    const deleteMsgEvent = (e) => {
      const { target } = e.detail 
      messageService.deleteMessage({ chat_id: target.chat_id, message_id: target.message_id });
    }

    onMounted(() => {
      if (!chat.value.chat_id) {
        socket.on(`chat:start:${user_id}`, ({ chat_id, message }) => {
          chat.value.chat_id = chat_id;
          chat.value.messages.push(message);

          window.addEventListener("delete-message", deleteMsgEvent);
          socket.on(`message:add:${chat.value.chat_id}`, addMessage);
          socket.on(`message:delete:${chat.value.chat_id}`, removeMessage); 
          socket.on(`message:edit:${chat.value.chat_id}`, editMessage);
        })
      }
      else {
        window.addEventListener("delete-message", deleteMsgEvent);
        socket.on(`message:add:${chat.value.chat_id}`, addMessage);
        socket.on(`message:delete:${chat.value.chat_id}`, removeMessage); 
        socket.on(`message:edit:${chat.value.chat_id}`, editMessage);
      }
    });
    onUnmounted(() => {
      window.removeEventListener("delete-message", deleteMsgEvent);
      socket.off(`message:add:${chat.value.chat_id}`);
      socket.off(`message:delete:${chat.value.chat_id}`); 
      socket.off(`message:edit:${chat.value.chat_id}`); 
      socket.off(`chat:start:${user_id}`);
    });

    chat.value = await chatService.getUserChat({ user_id }).then((r) => r.data);

    return {
      chat,
      userRole,
      meta,
    };
  },
};
</script>

<template>
  <chat-template
    :chat_id="chat.chat_id"
    :messages="chat.messages"
    :user-role="userRole"
    :meta="meta"
  />
</template>
