<script setup>
/* eslint-disable */
import MessagePrivileges from "@/utils/MessagePrivileges.util";
import TransitionFadeOver from "./transitions/TransitionFadeOver.vue";
import { computed, defineProps } from "vue";

const props = defineProps({
  message_data: { type: Object, default: () => {} },
  position: { type: Object, default: () => ({ x: 0, y: 0 }) },
  activator: { type: Boolean, default: false },
  privileges: { type: Array, default: () => [] },
});
const contextMenuPosition = computed(() => {
  return { top: props.position.y + "px", left: props.position.x + "px" };
});

const onMenuAction = (action) => {
  window.dispatchEvent(
    new CustomEvent(`${action}`, { detail: { target: props.message_data } })
  )
};
</script>

<template>
  <transition-fade-over>
    <div v-if="activator" class="message-context-menu">
      <ul class="message-context-menu__menu" :style="contextMenuPosition">
        <li
          v-for="menu_item in props.privileges"
          :key="menu_item.name"
          class="message-context-menu__item"
          @click="onMenuAction(menu_item.action)"
        >
          <p class="message-context-menu__text">{{ menu_item.name }}</p>
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
