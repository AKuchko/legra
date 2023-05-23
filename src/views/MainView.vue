<script>
import PostsList from "@/components/PostsList.vue";
import ForwardWindow from "@/components/ForwardWindow.vue";
import { ref, onMounted } from "vue";
import postService from "@/services/post.service";
// import socket from "@/socket";

export default {
  components: { PostsList, ForwardWindow },
  async setup() {
    const news = ref({});

    onMounted(() => {
      // socket.on("post:edit:")
      console.log(news.value);
    });

    news.value = await postService.getNews().then((r) => r.data);

    return {
      news,
    };
  },
};
</script>

<template>
  <main class="news">
    <ForwardWindow />
    <section v-if="news.new_posts.length" id="newposts" class="news__section">
      <p class="news__section-name secondary">New posts</p>
      <PostsList :posts="news.new_posts" />
    </section>
    <section id="newposts" class="news__section">
      <p class="news__section-name secondary">Old posts</p>
      <PostsList :posts="news.old_posts" />
    </section>
  </main>
</template>

<style lang="scss">
.news {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;

  &__section-name {
    display: block;
    width: 100%;
    padding: 0.8rem;
    border-radius: 0.5rem;
    margin: 0.8rem 0;
  }
}
</style>
