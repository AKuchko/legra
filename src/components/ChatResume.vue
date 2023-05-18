<script>
import BaseProfileImage from "./common/BaseProfileImage.vue";
import BaseContextMenu from "./common/BaseContextMenu.vue";
// import DropDownMenu from "./DropDownMenu.vue";
import { ref } from "vue";
export default {
  name: "ChatResume",
  components: { BaseProfileImage, BaseContextMenu },
  props: {
    chatInfo: { type: Object, default: () => {} },
  },
  setup(props) {
    const activator = ref(false);
    const chatLink = ref({
      name: "chat",
      params: { user_id: props.chatInfo.user_id },
    });
    const actions = [
      { name: "Delete", action: "chat-delete", icon: "ion:ios-trash-outline" },
    ];
    const openMenu = () => (activator.value = true);
    const closeMenu = () => (activator.value = false);
    const onContext = (e) => {
      e.preventDefault();
      openMenu();
      console.log("action");
    };
    return {
      activator,
      chatLink,
      actions,
      onContext,
      closeMenu,
    };
  },
};
</script>

<template>
  <router-link :to="chatLink" class="chat-resume" @contextmenu="onContext">
    <base-context-menu
      :menu="actions"
      :target="chatInfo"
      :activator="activator"
      @close="closeMenu"
    />
    <base-profile-image
      :imageData="chatInfo.chat_image"
      :user_name="chatInfo.chat_name"
    />
    <div v-if="chatInfo.last_message" class="chat-resume__body">
      <div class="chat-resume__info-row">
        <h3>{{ chatInfo.chat_name }}</h3>
        <div class="separator"></div>
        <div class="chat-resume__last-msg-meta">
          <span class="chat-resume__time">{{
            chatInfo.last_message.created
          }}</span>
        </div>
      </div>
      <div class="chat-resume__subtitle">
        <span>{{ chatInfo.last_message.message }}</span>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss">
.chat-resume {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: $transition-base;

  &:hover {
    background: rgba($color: $color-placeholder, $alpha: 0.5);
  }

  &__body {
    flex: 1;
    text-align: left;
    line-height: 1.5rem;
    margin-left: 0.5rem;

    span {
      font-size: 0.875rem;
    }
  }

  &__info-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;

    .separator {
      flex-grow: 1;
    }
  }
}
</style>
