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
  position: absolute;
  top: 0;
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-leave-to {
  position: absolute;
  top: 0;
  opacity: 0;
  transform: translate(-100%, 0);
}
</style>
