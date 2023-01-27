<template>
  <button class="base-button" :class="buttonTheme">
    <slot>{{ label }}</slot>
  </button>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
  computed: {
    buttonTheme() {
      if (this.theme === "danger") return "base-button--danger";
      return "";
    },
  },
};
</script>

<style lang="scss">
.base-button {
  width: 100%;
  height: 56px;
  max-width: 375px;
  border-radius: $border-radius-base;
  color: $color-light;
  background: $color-accent;

  &:hover {
    opacity: 0.8;
  }
}

.base-button--dannger {
  background: $color-danger;
}
</style>
