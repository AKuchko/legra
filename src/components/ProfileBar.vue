<script>
/* eslint-disable */
import BaseProfileImage from "./common/BaseProfileImage.vue";
import ProfileActions from "./ProfileActions.vue";
import UserStats from "./UserStats.vue";

export default {
  name: "ProfileBar",
  components: { BaseProfileImage, ProfileActions, UserStats },
  props: {
    user: { type: Object, default: () => {} }
  },
};
</script>

<template>
  <div class="profile-bar">
    <div class="profile-bar__head">
      <base-profile-image v-if="user.profile_image" :imageData="user.profile_image[0].data" :size="100" />
      <div class="profile-bar__user-activity">
        <user-stats :user="user" class="profile-bar__stats" />
        <profile-actions :user_id="user.user_id" :followers="user.followers" class="profile-bar__actions" />
      </div>
    </div>
    <div class="profile-bar__bottom">
      <p class="profile-bar__text">
        <span>{{ user.profile_name }}</span>
      </p>
      <p ref="description_text" class="profile-bar__text profile-bar__desc">
        {{ user.profile_description }}
        <button class="show-more">more</button>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.profile-bar {
  padding: 1rem;
  font-size: 0.875rem;
  max-width: 25rem;
  min-width: 25rem;

  &__head {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  &__user-activity {
    flex-grow: 1;
    margin-left: 1rem;
  }

  &__stats {
    margin-bottom: 1rem;
  }

  &__bottom p:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  &__text {
    text-align: left;
    line-height: 1rem;

    span {
      font-size: 1.25rem;
      font-weight: 700;
    }
  }

  &__desc {
    max-height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
