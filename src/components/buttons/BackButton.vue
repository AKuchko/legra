<script>
import { Icon } from "@iconify/vue";
export default {
  name: "BackButton",
  components: { Icon },
};
</script>

<template>
  <button class="back-button" title="Back">
    <Icon icon="material-symbols:arrow-back-rounded" width="25" />
  </button>
</template>

<style lang="scss">
.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  transition: $transition-base;

  &:hover {
    background: $color-placeholder;
  }
}
</style>
