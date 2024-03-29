import client from "@/http/client";

class MessageService {
  _form_data_headers = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  getMessages({ chat_id }) {
    return client.get(`/api/message/${chat_id}`);
  }
  postMessage({ chat_id, message, media, reply_message_id, meta }) {
    const formData = new FormData();

    for (let i = 0; i < media.files.length; i++)
      formData.append("media", media.files[i]);

    formData.append("message", message);
    formData.append("chat_id", chat_id);
    formData.append("reply_message_id", reply_message_id);
    formData.append("meta", JSON.stringify(meta));

    return client.post("/api/message/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  forwardMessage({ forward_obj, to }) {
    client.post("/api/message/forward", { forward_obj, to });
  }
  editMessage({ chat_id, message_id, message }) {
    client.put("/api/message/edit", { chat_id, message_id, message });
  }
  deleteMessage({ message_id, chat_id }) {
    client.delete(`/api/message/delete/${chat_id}/${message_id}`);
  }
}

export default new MessageService();
