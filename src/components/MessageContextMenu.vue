<script>
import TransitionFadeOver from "./transitions/TransitionFadeOver.vue";
import messageService from "@/services/message.service";
import { ref, computed } from "vue";

export default {
  name: "MessageContextMenu",
  props: {
    message_data: { type: Object, default: () => {} },
    position: { type: Object, default: () => ({ x: 0, y: 0 }) },
    activator: { type: Boolean, default: false },
  },
  components: { TransitionFadeOver },
  setup(props) {
    const menu_list = ref([
      {
        id: 0,
        text: "Delete message",
        icon: "",
        action: "delete",
      },
      {
        id: 1,
        text: "Edit message",
        icon: "",
        action: "edit",
      },
    ]);
    const contextMenuPosition = computed(() => {
      return { top: props.position.y + "px", left: props.position.x + "px" };
    });

    const onMenuAction = (action) => {
      switch (action) {
        case "delete":
          console.log(props.message_data);
          messageService.deleteMessage({
            message_id: props.message_data.message_id,
          });
          break;
        case "edit":
          console.log("edit");
      }
    };

    return {
      menu_list,
      contextMenuPosition,
      onMenuAction,
    };
  },
};
</script>

<template>
  <transition-fade-over>
    <div v-if="activator" class="message-context-menu">
      <ul class="message-context-menu__menu" :style="contextMenuPosition">
        <li
          v-for="menu_item in menu_list"
          :key="menu_item.id"
          class="message-context-menu__item"
          @click="onMenuAction(menu_item.action)"
        >
          <p class="message-context-menu__text">{{ menu_item.text }}</p>
          <i class="message-context-menu__icon"></i>
        </li>
      </ul>
    </div>
  </transition-fade-over>
</template>

<style lang="scss">
.message-context-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 55;

  &__menu {
    position: absolute;
    border-radius: 1rem;
    background: $color-light-bg;
    overflow: hidden;
  }

  &__item {
    padding: 0.5rem 1rem;
    transition: $transition-base;
    text-align: left;

    &:hover {
      background: rgba($color: #000000, $alpha: 0.1);
    }
  }
}
</style>
