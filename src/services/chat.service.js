import client from "@/http/client";

class ChatService {
  getUserChat({ user_id }) {
    console.log("Chat");
    return client.get(`/api/chat/${user_id}`);
  }
  getUserChats({ user_id }) {
    return client.get(`/api/chat/all/${user_id}`);
  }
}

export default new ChatService();
