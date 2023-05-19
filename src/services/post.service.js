/* eslint-disable */ 
import client from "@/http/client";
// import store from "@/store";

class PostService {
  fetchUserPosts({ user_id }) {
    return client.get(`/api/posts/user/${user_id}`);
  }
  getPost({ post_id }) {
    return client.get(`/api/posts/post/${post_id}`);
  }
  getComments({ post_id }) {
    return client.get(`/api/posts/comments/${post_id}`)
  }
  createPost({ post_media, post_cropper, post_caption = "" }) {
    const formData = new FormData();

    for (let i = 0; i < post_media.length; i++) {
      formData.append('post_media', post_media[i]);
    }
    formData.append('post_cropper', JSON.stringify(post_cropper));
    formData.append('post_caption', post_caption);

    return client.post('/api/posts/create', formData, 
    {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    });
  }
  deletePost({ post_id }) {
    return client.delete(`/api/posts/${post_id}`);
  }
  likePost({ post_id, post_user_id }) {
    return client.post("/api/posts/like", { post_id, post_user_id });
  }
  visit({ post_id, post_user_id }) {
    client.post("/api/posts/visit", { post_id, post_user_id });
  }
  getNews() {
    return client.get("/api/posts/news")
  }
}

export default new PostService();
