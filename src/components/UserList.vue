<script>
/* eslint-disable */ 
import BaseProfileImage from "./common/BaseProfileImage.vue";

export default {
  name: "UserList",
  components: { BaseProfileImage },
  props: {
    users: { type: Array, default: () => [] },
    loading: { type: Boolean, default: true },
  },
};
</script>

<template>
  <div class="user-list">
    <ul class="user-list__list">
      <li v-for="user in users" :key="user.user_id" class="user-list__item">
        <router-link
          :to="{ name: 'user', params:{ user_id: user.user_id } }"
          class="user-list__user-info"
        >
            <base-profile-image :imageData="user.profile_image" :user_name="user.user_name" :size="40" />
            <h2 class="user-list__user-name">{{ user.user_name }}</h2>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.user-list {
  width: 100%;
  overflow: hidden;
  padding: 0.8rem 0.5rem;

  &__list {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  &__item {
    height: 3rem;
    border-radius: 0.5rem;
    padding: 0 0.5rem;
    transition: $transition-base;

    &:hover {
        background: rgba($color: $color-placeholder, $alpha: 0.5);
    }
  }

  &__user-info {
    flex-grow: 1;
    display: flex;
    align-items: center;
    height: 100%;
  }

  &__user-name {
    margin-left: 0.5rem;
  } 
}
</style>
