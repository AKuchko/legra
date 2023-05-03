<script setup>
import TransitionFadeOver from "./transitions/TransitionFadeOver.vue";
import { computed, defineEmits, defineProps } from "vue";
import { useStore } from "vuex";

// UTIL
const store = useStore();
const props = defineProps({
  message_data: { type: Object, default: () => {} },
  position: { type: Object, default: () => ({ x: 0, y: 0 }) },
  activator: { type: Boolean, default: false },
  rights: { type: String, default: "customer" },
});
const emit = defineEmits(["reply", "delete", "edit"]);

// VARS
const message_owner_action_list = [
  { id: 0, text: "Delete message", action: "delete" },
  { id: 1, text: "Edit message", action: "edit" },
  { id: 2, text: "Copy message", action: "copy" },
  { id: 3, text: "Forward message", action: "forward" },
  { id: 4, text: "Reply", action: "reply" },
];
const chat_owner_customer_msg = [
  { id: 0, text: "Delete message", action: "delete" },
  { id: 1, text: "Copy message", action: "copy" },
  { id: 2, text: "Forward message", action: "forward" },
  { id: 3, text: "Reply", action: "reply" },
];
const message_customer_action_list = [
  { id: 0, text: "Copy message", action: "copy" },
  { id: 1, text: "Forward message", action: "forward" },
  { id: 2, text: "Reply", action: "reply" },
];

// COMPUTED
const menu_list = computed(() => {
  if (props.message_data.user_id === store.getters.userInfo.user_id)
    return message_owner_action_list;
  else if (
    (props.rights === "admin") &
    (props.message_data.user_id !== store.getters.userInfo.user_id)
  )
    return chat_owner_customer_msg;
  return message_customer_action_list;
});
const contextMenuPosition = computed(() => {
  return { top: props.position.y + "px", left: props.position.x + "px" };
});

// FUNCTIOINS
const onMenuAction = (action) => {
  emit(action);
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
  color: #111;

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
