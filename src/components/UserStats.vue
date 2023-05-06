<script>
/* eslint-disable */
// import { ref } from 'vue';
export default {
  name: "UserStats",
  props: {
    user: { type: Object, default: () => {} }
  },
}
</script>

<template v-if="user">
  <div class="user-stats">
    <div class="user-stats__wrapper">
      <ul class="user-stats__list">
        <li id="user-posts-count" class="user-stats__item">
          <div class="user-stats__item-value">
            <span>{{ user.posts_count }}</span>
          </div>
          <p class="user-stats__item-name">Posts</p>
        </li>
        <li id="user-followers-count" class="user-stats__item">
          <div class="user-stats__item-value">
            <span>{{ user.followers.length }}</span>
          </div>
          <p class="user-stats__item-name">Followers</p>
        </li>
        <li id="user-following-count" class="user-stats__item">
          <div class="user-stats__item-value">
            <span>{{ user.follwing.length }}</span>
          </div>
          <p class="user-stats__item-name">Following</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.user-stats {
  &__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__item {
    position: relative;
    text-align: center;
    font-weight: 300;
  }

  &__item-value {
    font-size: 1.25rem;
  }
}
</style>