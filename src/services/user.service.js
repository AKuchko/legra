/* eslint-disable */ 
import client from "@/http/client";

class UserService {
  fetchUserFollowers({ user_id }) {
    return client.get(`/api/users/followers/${user_id}`);
  }

  fetchUserInfo({ user_id }) {
    return client.get(`/api/users/id/${user_id}`);
  }

  fetchUserSubscribes({ user_id }) {
    return client.get(`/api/users/subscribes/${user_id}`);
  }
}

export default new UserService();
