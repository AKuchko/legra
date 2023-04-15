<template>
  <div class="post">{{ post_id }}</div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "UserPost",
  props: {
    posts: { type: Array, default: () => [] },
  },
  setup() {
    const route = useRoute();
    const post_id = ref(route.params.post_id);

    return {
      post_id,
    };
  },
};
</script>

<style>
.post {
}
</style>
