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
const message_text = ref("");
const message_media = new DataTransfer();

const updateCommentText = (value) => (message_text.value = value);
const createComment = () => {
  messageService.postMessage({ chat_id: post.value.chat_id, message_text: message_text.value, message_media });
}
const updateCommentMedia = ({ _files_data }) => {
  for (let i = 0; i < _files_data.length; i++) {
    message_media.items.add(_files_data[i]);
  }
}

onMounted(async () => {
  socket.on(`comment:add:${post_id}`, (newComment) => (comments.value.push(newComment)));
  post.value = await postService.getPost({ post_id }).then((r) => r.data);
  comments.value = await messageService.getMessages({ chat_id: post.value.chat_id }).then((r) => r.data);
});
onUnmounted(() => {
  socket.off(`comment:add:${post_id}`);
})
</script>

<template>
  <div class="user-post-comments">
    <div class="user-post-comments__content">
      <post-template :post="post" class="user-post-comments__post"/>
      <message-list
        class="user-post-comments__comment_list"
        :messages="comments"
      />
    </div>
    <message-input-box
      :message_model="message_text"
      @on-media-add="updateCommentMedia"
      @on-message-input="updateCommentText"
      @send-message="createComment"
    />
  </div>
</template>

<style lang="scss">
.user-post-comments {
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
