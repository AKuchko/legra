<template>
  <Transition name="window">
    <div v-if="visible" class="additoinal-window">
      <button @click="$emit('hide-window')">
        <Icon icon="cil:arrow-left" />
      </button>
      <slot></slot>
    </div>
  </Transition>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "AdditionalWindow",
  props: { visible: { type: Boolean, default: false } },
  emits: ["hide-window"],
  components: { Icon },
  watch: {
    visible(newState) {
      const body = document.querySelector("body");
      if (newState) body.classList.add("no-scroll");
      else body.classList.remove("no-scroll");
    },
  },
};
</script>

<style lang="scss">
.additoinal-window {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: $color-light;
}

.window-enter-active,
.window-leave-active {
  transition: left 0.3s ease;
}

.window-enter-from,
.window-leave-to {
  opacity: 0;
  left: 100%;
}
</style>
