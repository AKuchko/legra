<template>
  <transition name="fadeOver" mode="out-in">
    <slot></slot>
  </transition>
</template>

<style>
.fadeOver-enter-active,
.fadeOver-leave-active {
  opacity: 1;
  transform: scale(1);
  transition: 0.2s;
}

.fadeOver-enter-from,
.fadeOver-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
