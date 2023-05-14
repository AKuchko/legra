<template>
  <div class="base-input">
    <input
      ref="input"
      class="base-input__input"
      :value="modelValue"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label class="base-input__placeholder" :class="placeholderState">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    modelValue: { type: [String, Number], default: "" },
    label: { type: String, default: "" },
    type: { type: String, default: "text" },
  },
  computed: {
    placeholderState() {
      return this.modelValue ? "active" : "";
    },
  },
};
</script>

<style lang="scss">
.base-input {
  position: relative;
  width: 100%;
  height: 54px;
  padding: 15px;
  margin: auto;
  border: 1px solid rgba($color: $color-placeholder, $alpha: 0.5);
  border-radius: $border-radius-base;
  background: inherit;

  &__input {
    width: 100%;
    height: 100%;
  }

  &__placeholder {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    transition: $transition-base;
    color: $color-placeholder;
    background: inherit;
    pointer-events: none;
  }

  &__placeholder.active {
    top: 0;
    left: 5px;
    padding: 0 5px;
    font-size: $font-xsmall;
  }

  &__input:focus ~ .base-input__placeholder {
    top: 0;
    left: 5px;
    padding: 0 5px;
    font-size: $font-xsmall;
  }
}
</style>
