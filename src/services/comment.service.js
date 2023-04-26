import client from "@/http/client";

class CommentService {
  getComments({ post_id }) {
    return client.get(`/api/comment/post/${post_id}`);
  }

  postComment({ post_id, comment_text, comment_media }) {
    const formData = new FormData();

    for (let i = 0; i < comment_media.length; i++) {
      formData.append("comment_media", comment_media[i]);
    }

    formData.append("comment_text", comment_text);
    formData.append("post_id", post_id);

    client.post("/api/comment/create", formData);
  }

  updateComment({ comment_id, comment_text }) {
    client.put(`/api/update/`, { comment_id, comment_text });
  }

  deleteComment({ comment_id }) {
    client.delete(`/api/delete`, { comment_id });
  }
}

export default new CommentService();
