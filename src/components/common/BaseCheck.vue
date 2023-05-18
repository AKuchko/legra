<script>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
export default {
  name: "BaseCheck",
  components: { Icon },
  emits: ["checked", "unchecked"],
  setup(props, { emit }) {
    const checkInput = ref(null);
    const checked = ref(false);
    const onCheck = (e) => {
      checked.value = e.target.checked;
      emit(checked.value ? "checked" : "unchecked");
    };

    return {
      checkInput,
      checked,
      onCheck,
    };
  },
};
</script>

<template>
  <label class="base-check">
    <slot></slot>
    <input
      ref="checkInput"
      :checked="checked"
      type="checkbox"
      @change="onCheck"
    />
    <span class="base-check__checkmark">
      <Icon class="base-check__icon" icon="ion:checkmark" />
    </span>
  </label>
</template>

<style lang="scss">
.base-check {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.125rem 0.8rem;
  border-radius: 0.25rem;
  transition: $transition-base;

  &__checkmark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid $color-placeholder;
    transition: $transition-base;
    color: $color-light;
  }

  &__icon {
    transition: $transition-base;
    transform: scale3d(0, 0, 0);
  }

  input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }

  input:checked ~ .base-check__checkmark {
    background: $color-accent;
    border-color: transparent;

    @media (prefers-color-scheme: dark) {
      background: $color-accent-dark;
    }

    .base-check__icon {
      transform: scale3d(1, 1, 1);
    }
  }

  &:hover {
    background: rgba($color: $color-placeholder, $alpha: 0.5);

    .base-check__checkmark {
      background: rgba($color: $color-placeholder, $alpha: 0.1);
    }
  }
}
</style>
