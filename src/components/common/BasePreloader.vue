<template>
  <div class="preloader"></div>
</template>

<script>
export default {
  name: "BasePreloader",
};
</script>

<style lang="scss">
.preloader {
  width: 100%;
  height: 100%;
  background: $color-placeholder;
  animation: preload 0.5s infinite;
}

@keyframes preload {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
