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

  followUser({ user_id }) {
    return client.post("/api/users/follow", { user_id });
  }

  unfollowUser({ user_id }) {
    return client.delete(`/api/users/unfollow/${user_id}`);
  }
}

export default new UserService();
