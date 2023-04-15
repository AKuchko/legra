<template>
  <transition name="slide">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "TransitionSlide",
  props: {
    direction: { type: String, default: "forward" },
  },
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: 0.5s;
}

.slide-enter-from {
  transform: translate(100vw, 0);
}

.slide-leave-to {
  transform: translate(-100vw, 0);
}
</style>
