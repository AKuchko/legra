<script>
/* eslint-disable */ 
import BaseBackBtn from "../common/BaseBackBtn.vue";
import MainLayer from "./MainLayer.vue";
import BaseSearch from "../common/BaseSearch.vue";
import UserList from "../UserList.vue";
import { useStore } from "vuex";
import userService from "@/services/user.service";
import { ref } from "vue";

export default {
  name: "SearchLayer",
  components: { BaseBackBtn, BaseSearch, UserList },
  setup() {
    const store = useStore();
    const users = ref([]);
    const loading = ref(false);
    const back = () => {
      store.dispatch("toggleComponent", { component: MainLayer });
    };

    const onSearch = async ({ value }) => {
      if (!value) return users.value = [];
      loading.value = true;
      users.value = await userService.findUser({ user_name: value }).then((r) => r.data);
      loading.value = false;
    };

    return {
      loading,
      users,
      back,
      onSearch,
    };
  },
};
</script>

<template>
  <div class="search">
    <div class="search__header">
      <BaseBackBtn @click="back" />
      <div class="search__header-content">
        <h3 class="search__header-title">Search</h3>
        <div class="search__header-more"></div>
      </div>
    </div>
    <div class="search__body">
      <div class="search__input">
        <BaseSearch @on-search="onSearch" />
        <UserList :users="users" :loading="loading" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.search {
  width: 100%;
  min-width: 25rem;
  height: 100%;

  &__header {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.8rem;
    height: 3.5rem;
    border-bottom: 1px solid rgba($color: $color-placeholder, $alpha: 0.3);
  }

  &__header-content {
    flex: 1;
    display: flex;
    align-items: center;
  }
}
</style>
