<script>
/* eslint-disable */
// import { ref } from 'vue';
export default {
  name: "UserStats",
  props: {
    stats: Object,
  },
}
</script>

<template>
  <div class="user-stats">
    <div class="user-stats__wrapper">
      <ul class="user-stats__list">
        <li v-for="stat in stats" :key="stat.name" class="user-stats__item">
          <div class="user-stats__item-value">
            <span>{{ stat.value }}</span>
          </div>
          <p class="user-stats__item-name">{{ stat.name }}</p>
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