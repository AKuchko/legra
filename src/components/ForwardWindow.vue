<script>
/* eslint-disable */ 
import TransitionFade from "./transitions/TransitionFade.vue";
import BaseProfileImage from "./common/BaseProfileImage.vue";
import BaseButton from "./common/BaseButton.vue";
import BaseCheck from "./common/BaseCheck.vue";
import BaseSearch from "./common/BaseSearch.vue";
import messageService from '@/services/message.service';
import { useStore } from "vuex";
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "ForwardWindow",
  components: { BaseProfileImage, BaseButton, BaseCheck, BaseSearch, TransitionFade },
  //   props: {
  //     forwardObj: { type: Object, default: () => {} },
  //     users: { type: Array, default: () => [] },
  //     activator: { type: Boolean, default: false },
  //   },
  setup() {
    const store = useStore();
    const forwardObject = ref(null);
    const activator = ref(false);
    const following = store.getters.userInfo.follwing;
    const filteredUsers = ref([]);
    let selectedUsers = [];

    const onSelect = (user) => (selectedUsers.push(user));
    const onUnselect = (user) => (selectedUsers = selectedUsers.filter(usr => usr.user_id != user.user_id));
    const search = ({ value }) => {
      if (!value) {
        filteredUsers.value = following;
        console.log("empty");
      }
      filteredUsers.value = following.filter(
        (usr) => (usr.user_name.toLowerCase().indexOf(value.toLowerCase()) > -1)
      );
    };
    const openWithMsg = (e) => {
      const target = e.detail.target;
      forwardObject.value = {
        from: target.from_id,
        post_id: target.message_id,
        user_name: target.user_name,
        type: "msg"
      }
      activator.value = true;
    };
    const openWithPost = (e) => {
      const target = e.detail.target;
      forwardObject.value = {
        from: target.user_id,
        post_id: target.post_id,
        user_name: target.user_name,
        type: "post"
      }
      activator.value = true;
    }
    const close = () => {
      activator.value = false;
      forwardObject.value = null;
      selectedUsers = [];
    };
    const onSubmit = () => {
      for (let user of selectedUsers) {
        console.log(forwardObject.value);
        messageService.forwardMessage({ forward_obj: forwardObject.value, to: user.user_id })
      }
    };

    onMounted(() => {
      window.addEventListener("forward-message", openWithMsg);
      window.addEventListener("post-forward", openWithPost)
      filteredUsers.value = following;
    });
    onUnmounted(() => {
      window.removeEventListener("forward-message", openWithMsg);
    });

    return {
      filteredUsers,
      activator,
      close,
      search,
      onSelect,
      onUnselect,
      onSubmit,
    };
  },
};
</script>

<template>
  <TransitionFade>
      <div v-if="activator" class="forward" @click="close">
        <div class="forward__window secondary" @click.stop>
          <div class="forward_searh">
            <base-search @on-search="search" />
          </div>
          <ul class="forward__users">
            <li
              v-for="user in filteredUsers"
              :key="user.user_id"
              class="forward__user"
            >
            <base-check @checked="onSelect(user)" @unchecked="onUnselect(user)">
                <base-profile-image
                :imageData="user.profile_image"
                :user_name="user.user_name"
                :size="40"
                />
                <h2 class="forward__user-name">{{ user.user_name }}</h2>
                <div class="separator"></div>
              </base-check>
            </li>
          </ul>
          <div class="forward__button">
            <base-button label="Forwad" @click="onSubmit" />
          </div>
        </div>
      </div>
  </TransitionFade>
</template>

<style lang="scss">
.forward {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: $color-dark, $alpha: 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 55;

  &__window {
    display: flex;
    flex-direction: column;
    min-width: 25rem;
    max-width: 25rem;
    height: 80%;
    overflow: hidden;
    border-radius: 1rem;
  }

  &__users {
    overflow-y: scroll;
    overflow-x: hidden;
    flex-grow: 1;
    padding:  0 0.8rem 0.125rem 0.8rem;
  }

  &__button {
    padding: 0.8rem;
  }

  .separator {
    flex: 1;
  }
}
</style>
