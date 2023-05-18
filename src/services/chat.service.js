import client from "@/http/client";

class ChatService {
  getUserChat({ user_id }) {
    return client.get(`/api/chat/${user_id}`);
  }
  getUserChats({ user_id }) {
    return client.get(`/api/chat/all/${user_id}`);
  }
  deleteUserChat({ chat_id }) {
    client.delete(`/api/chat/${chat_id}`);
  }
}

export default new ChatService();
