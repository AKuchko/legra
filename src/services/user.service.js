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

  findUser({ user_name }) {
    return client.get(`/api/users/find/${user_name}`);
  }

  updateUser({ user_name, description, profile_image, crop_data }) {
    const fd = new FormData();
    fd.append("profile_image", profile_image);
    fd.append("crop_data", JSON.stringify(crop_data));
    fd.append("user_name", user_name);
    fd.append("description", description);
    return client.put("/api/users/update", fd, { headers: { "Content-Type": "multipart/form-data" } });
  }
}

export default new UserService();
