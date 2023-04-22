import client from "@/http/client";

class CommentService {
  getComments({ post_id }) {
    return client.get(`/api/comment/post/${post_id}`);
  }

  postComment({ post_id, comment_text }) {
    client.post("/api/comment/create", { post_id, comment_text });
  }

  updateComment({ comment_id, comment_text }) {
    client.put(`/api/update/`, { comment_id, comment_text });
  }

  deleteComment({ comment_id }) {
    client.delete(`/api/delete`, { comment_id });
  }
}

export default new CommentService();
