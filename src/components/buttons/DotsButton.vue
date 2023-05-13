<script>
import { Icon } from "@iconify/vue";

export default {
  name: "DotsButton",
  components: { Icon },
};
</script>

<template>
  <button class="button-dots button-icon" title="More actions">
    <Icon icon="ion:md-more" width="25" />
  </button>
</template>

<style lang="scss">
.button-dots.active {
  background: $color-placeholder;
}
</style>
