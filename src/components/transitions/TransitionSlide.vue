<template>
  <transition name="slide">
    <slot></slot>
  </transition>
</template>

<script setup>
// import { defineProps } from "vue";
// const props = defineProps({
//   direction: { type: String, default: "forward" },
// });
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  position: relative;
  transition: 0.5s;
}

.slide-enter-from {
  position: absolute;
  height: 100vh;
  transform: translate(100%, 0);
}

.slide-leave-to {
  position: absolute;
  height: 100vh;
  transform: translate(-100%, 0);
}
</style>
