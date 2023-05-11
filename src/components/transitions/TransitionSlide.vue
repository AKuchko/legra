<template>
  <transition :name="dir">
    <slot></slot>
  </transition>
</template>

<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  reverse: { type: Boolean, default: false },
});
const dir = computed(() => (props.reverse ? "slide-reverse" : "slide"));
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: 0.5s;
}

.slide-enter-from {
  height: 100vh;
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-leave-to {
  height: 100vh;
  opacity: 0;
  transform: translate(-100%, 0);
}
</style>
