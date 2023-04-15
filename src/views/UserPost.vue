<template>
  <div class="comment-view">
    <!-- <post-template :post="post" /> -->
    <comment-list :comments="comments" />
  </div>
</template>

<script>
// import PostTemplate from "@/components/PostTemplate.vue";
import CommentList from "@/components/CommentList.vue";

import commentService from "@/services/comment.service.js";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "UserPost",
  components: { CommentList },
  setup() {
    const route = useRoute();
    const post_id = route.params.post_id;
    const comments = ref([]);
    const post = ref({});

    onMounted(() => {
      commentService
        .getComments({ post_id })
        .then((res) => (comments.value = res.data));
    });

    return {
      comments,
      post,
    };
  },
};
</script>

<style>
.post {
}
</style>
