<script>
/* eslint-disable */
import userService from '@/services/user.service';
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
export default {
  name: "ProfileActions",
  props: {
    user_id: Number,
    followers: Array,
  },
  setup(props) {
    const store = useStore();
    const myActions = computed(() => store.getters.userInfo.user_id === props.user_id);
    const isFollowing = ref(false);
    const message_link = { name: "chat", params: { user_id: props.user_id }};
    const createFollow = () => ( userService.followUser({ user_id: props.user_id }) );
    const deleteFollow = () => ( userService.unfollowUser({ user_id: props.user_id }) );
    const followAction = () => {
      if (!isFollowing.value) createFollow();
      else deleteFollow();
      setTimeout(() => console.log(props.followers), 1000);
    }
    const openCreateModal = () => ( window.dispatchEvent(new CustomEvent("openPostCreator")) );

    watch(props, () => {
      console.log("chaange");
      isFollowing.value = props.followers ? props.followers.find(follower => follower.user_id === store.getters.userInfo.user_id) : false;
    })

    onMounted(() => {
      isFollowing.value = props.followers ? props.followers.find(follower => follower.user_id === store.getters.userInfo.user_id) : false;
    });

    return {
      myActions,
      isFollowing,
      message_link,
      openCreateModal,
      followAction,
    }
  },
};
</script>

<template>
  <div v-if="!myActions" class="action-composer">
    <button
      class="action-composer__action" 
      :class="{'accent': !isFollowing, 'action-composer__action--dark': isFollowing}"
      @click="followAction"
    >
      {{ isFollowing ? "Unfollow" : "Follow +" }}
    </button>
    <router-link :to="message_link" class="action-composer__action accent">Message</router-link>
  </div>
  <div v-else class="action-coposer">
    <button class="action-composer__action accent" @click="openCreateModal">Create new post</button>
  </div>
</template>

<style lang="scss">
.action-composer {
  display: flex;
  flex-basis: 1.5rem;

  &__action {
    padding: 0.5625rem;
    width: 100%;
    border-radius: 0.25rem;
    color: $color-light-bg;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 0.625rem;
    }

    &--dark {
      background: $color-dark-secondary;
    }
  }
}
</style>
