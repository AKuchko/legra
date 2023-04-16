<script setup>
// import PostTemplate from "@/components/PostTemplate.vue";
import CommentList from "@/components/CommentList.vue";
import MessageInputBox from "@/components/MessageInputBox.vue";

import commentService from "@/services/comment.service.js";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const post_id = route.params.post_id;
const comments = ref([]);
const message_text = ref("");

function updateMessageText(value) {
  message_text.value = value;
}

onMounted(() => {
  commentService
    .getComments({ post_id })
    .then((res) => (comments.value = res.data));
});
</script>

<template>
  <div class="user-post-comments">
    <!-- <post-template :post="post" /> -->
    <comment-list :comments="comments" />
    <message-input-box
      :message_model="message_text"
      @on-message-input="updateMessageText"
    />
  </div>
</template>

<style>
.user-post-comments {
  display: flex;
  flex-direction: column;
}
</style>
