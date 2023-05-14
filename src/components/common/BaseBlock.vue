<template>
  <div class="block secondary" :class="blockTheme">
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
  border-radius: 0.75rem;
}
</style>
