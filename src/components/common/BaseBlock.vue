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
  border-radius: 32px;
  background: $color-light-bg;
}
</style>
