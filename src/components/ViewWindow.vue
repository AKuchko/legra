<template>
  <div class="window">
    <div class="window__wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewWindow",
};
</script>

<style lang="scss">
.window {
  position: relative;
  display: flex;
  align-items: center;
  overflow-y: scroll;

  &__wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 50px 0 0;
  }
}
</style>
