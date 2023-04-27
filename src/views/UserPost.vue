<script setup>
/* eslint-disable */
// components
import PostTemplate from "@/components/PostTemplate.vue";
import MessageList from "@/components/MessageList.vue";
import MessageInputBox from "@/components/MessageInputBox.vue";
// util
import messageService from "@/services/message.service";
import postService from "@/services/post.service.js";
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import socket from "@/socket";

const route = useRoute();
const post_id = route.params.post_id;
const post = ref({});
const comments = ref([]);

const createComment = ({ message_text, message_media }) => {
  messageService.postMessage({ chat_id: post.value.chat_id, message_text, message_media });
}

onMounted(async () => {
  post.value = await postService.getPost({ post_id }).then((r) => r.data);
  comments.value = await messageService.getMessages({ chat_id: post.value.chat_id }).then((r) => r.data);
  socket.on(`message:add:${post.value.chat_id}`, (newComment) => (comments.value.push(newComment)));
});
onUnmounted(() => {
  socket.off(`message:add:${post.value.chat_id}`);
})
</script>

<template>
  <div class="user-post">
    <div class="user-post__content">
      <post-template class="user-post__post" :post="post" />
      <message-list class="user-post__comment_list" :messages="comments" />
    </div>
    <message-input-box @send-message="createComment" />
  </div>
</template>

<style lang="scss">
.user-post {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  &__post {
    margin-bottom: 25px;
  }

  &__content {
    width: 100%;
    overflow-y: scroll;
  }
}
</style>
