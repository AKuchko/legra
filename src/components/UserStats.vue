<template>
  <div class="stats">
    <ul class="stats__list">
      <li v-for="stat in stats" :key="stat.id" class="stats__item">
        <div class="stats__inner">
          <h4 class="stats__value">{{ stat.value }}</h4>
          <p class="stats__name">{{ stat.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */ 
import userService from "@/services/user.service";

export default {
  name: "UserStats",
  props: {
    user_id: { type: Number, default: 6 },
  },
  data() {
    return {
      stats: [
        {
          id: 0,
          name: "Followers",
          value: 3,
        },
        {
          id: 1,
          name: "Subscribes",
          value: 3,
        },
        {
          id: 2,
          name: "Posts",
          value: 3,
        },
      ],
      is_loaded: "loading",
    };
  },
  mounted() {
    userService.fetchUserFollowers({ user_id: this.user_id }).then((user_followers) => {
    //   console.log(user_followers);
    });
  },
};
</script>

<style lang="scss">
.stats {
  font-size: $font-small;

  &__list {
    display: flex;
    align-items: center;
  }

  &__item {
    width: 4rem;
    margin-left: 10px;
    text-align: center;
  }

  &__value {
    font-weight: 700;
    margin-bottom: 10px;
  }
}
</style>
