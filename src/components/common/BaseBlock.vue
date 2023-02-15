<template>
  <div class="block">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseBlock",
};
</script>

<style lang="scss">
.block {
  width: 100%;
  height: 100%;
  border-radius: $border-radius-base;
  background: $color-light-secondary;
}
</style>
