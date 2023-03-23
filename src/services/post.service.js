import client from "@/http/client";
import store from "@/store";

class PostService {
  fetchUserPosts() {
    const { userId } = store.getters;
    return client.get(`/posts/user/${userId}`);
  }
}

export default new PostService();
