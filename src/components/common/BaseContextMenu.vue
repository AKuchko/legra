<script>
/* eslint-disable */ 
import TransitionFadeOver from "../transitions/TransitionFadeOver.vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

export default {
  name: "BasContexMenu",
  components: { TransitionFadeOver, Icon },
  emits: ["close"],
  props: {
    activator: Boolean,
    target: { type: Object, default: () => {} },
    menu: { type: Array, default: () => [] },
  },
  setup(props, { emit }) {
    const menuRef = ref(null);
    const onMenuAction = (action) => {
      window.dispatchEvent(
        new CustomEvent(`${action}`, { detail: { target: props.target } })
      );
    };
    const closeMenu = () => (emit("close"));

    return {
      menuRef,
      onMenuAction,
      closeMenu,
    };
  },
};
</script>

<template>
  <div ref="menuRef" class="context-menu">
    <div v-if="activator" class="context-menu__backdrop" @click="closeMenu"></div>
    <transition-fade-over>
        <ul v-show="activator" class="context-menu__list">
            <li
                v-for="item in menu"
                :key="item.name"
                class="context-menu__item"
                @click="onMenuAction(item.action)"
            >
                <p>{{ item.name }}</p>
                <Icon :icon="item.icon" width="20" />
            </li>
        </ul>
    </transition-fade-over>
  </div>
</template>

<style lang="scss">
.context-menu {
  color: #111;

  &__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 20;
  }

  &__list {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 10rem;
    min-width: 12rem;
    padding: 0.25rem 0;
    border-radius: 1rem;
    background: rgba($color: $color-light-bg, $alpha: 0.8);
    overflow: hidden;
    overflow-y: scroll;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    z-index: 21;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2rem;
    padding: 0.5rem 1rem;
    transition: $transition-base;
    text-align: left;
    border-radius: 0.5rem;
    margin: 0.125rem 0.25rem;

    &:hover {
      background: rgba($color: $color-placeholder, $alpha: 0.5);
    }
  }
}
</style>
