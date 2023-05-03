import client from "@/http/client";

class MessageService {
  _form_data_headers = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  getUserChatRole({ chat_id }) {
    return client.get(`/api/chat/privileges/${chat_id}`);
  }

  getMessages({ chat_id }) {
    return client.get(`/api/chat/messages/${chat_id}`);
  }

  postMessage({
    chat_id,
    message_text,
    message_media,
    reply,
    forward_message,
    forward_post,
  }) {
    const formData = new FormData();

    if (forward_post) formData.append("msg_type", 2);
    else if (forward_message) formData.append("msg_type", 3);
    else formData.append("msg_type", 1);

    for (let i = 0; i < message_media.files.length; i++) {
      formData.append("message_media", message_media.files[i]);
    }
    formData.append("message_text", message_text);
    formData.append("chat_id", chat_id);
    formData.append("forward_post", forward_post);
    formData.append("forward_msg", forward_message);
    formData.append("reply", reply);

    return client.post("/api/chat/message/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  editMessage({ chat_id, message_id, message_text }) {
    client.put("/api/chat/message/edit", { chat_id, message_id, message_text });
  }

  deleteMessage({ message_id, chat_id }) {
    client.delete(`/api/chat/${chat_id}/message/delete/${message_id}`);
  }
}

export default new MessageService();
