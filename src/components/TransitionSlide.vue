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
  position: relative;
  transition: 0.5s;
}

.slide-enter-from {
  position: absolute;
  transform: translate(200%, 0);
}

.slide-leave-to {
  position: absolute;
  transform: translate(-200%, 0);
}
</style>
