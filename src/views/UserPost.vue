<script setup>
/* eslint-disable */
// components
import PostTemplate from "@/components/PostTemplate.vue";
import MessageList from "@/components/MessageList.vue";
import MessageInputBox from "@/components/MessageInputBox.vue";
// util
import commentService from "@/services/comment.service.js";
import postService from "@/services/post.service.js";
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import socket from "@/socket";

const comments = ref([]);
const post = ref({});
const message_text = ref("");
// const message_media = ref([]);
const route = useRoute();
const post_id = route.params.post_id;

function updateMessageText(value) {
  message_text.value = value;
}
function sendMessage() {
  commentService.postComment({ post_id, comment_text: message_text.value });
  socket.emit("comment:add", { post_id, comment: "Bla" });
}

onBeforeMount(() => {
  commentService.getComments({ post_id }).then((res) => (comments.value = res.data));
  postService.getPost({ post_id }).then((res) => (post.value = res.data));
});
</script>

<template>
  <div class="user-post-comments">
    <div class="user-post-comments__content">
      <post-template :post="post" />
      <message-list
        class="user-post-comments__comment_list"
        :messages="comments"
      />
    </div>
    <message-input-box
      :message_model="message_text"
      @on-message-input="updateMessageText"
      @send-message="sendMessage"
    />
  </div>
</template>

<style lang="scss">
.user-post-comments {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  &__content {
    width: 100%;
    overflow-y: scroll;
  }
}
</style>
