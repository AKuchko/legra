/* eslint-disable */ 
import client from "@/http/client";

class UserService {
  fetchUserFollowers({ user_id }) {
    return client.get(`/users/followers/${user_id}`);
  }

  fetchUserInfo({ user_id }) {
    return client.get(`/users/id/${user_id}`);
  }

  fetchUserSubscribes({ user_id }) {
    return client.get(`/users/subscribes/${user_id}`);
  }
}

export default new UserService();
