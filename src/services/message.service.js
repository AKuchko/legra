import client from "@/http/client";

class MessageService {
  _form_data_headers = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  getMessages({ chat_id }) {
    return client.get(`/api/chat/messages/${chat_id}`);
  }

  postMessage({ chat_id, message_text, message_media }) {
    const formData = new FormData();

    for (let i = 0; i < message_media.files.length; i++) {
      formData.append("message_media", message_media.files[i]);
    }
    formData.append("message_text", message_text);
    formData.append("chat_id", chat_id);

    return client.post("/api/chat/message/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  editMessage({ chat_id, message_id, message_text, message_media }) {
    const formData = new FormData();

    for (let i = 0; i < message_media.length; i++) {
      formData.append("message_media", message_media[i]);
    }
    formData.append("message_text", message_text);
    formData.append("chat_id", chat_id);
    formData.append("message_id", message_id);

    client.put("/api/chat/message/edit");
  }

  deleteMessage({ message_id }) {
    client.delete(`/api/chat/message/delete/${message_id}`, { message_id });
  }
}

export default new MessageService();
