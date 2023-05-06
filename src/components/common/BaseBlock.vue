<template>
  <div class="block" :class="blockTheme">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseBlock",
  props: {
    theme: { type: String, default: "origin" },
  },
  computed: {
    blockTheme() {
      if (["origin", "accent"].includes(this.theme))
        return `block--${this.theme}`;
      else return "block--origin";
    },
  },
};
</script>

<style lang="scss">
.block {
  border-radius: 0.5rem;
}

.block--origin {
  background: $color-light-bg;
}
.block--accent {
  background: $color-accent;
}
</style>
