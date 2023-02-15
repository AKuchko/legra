<template>
  <div class="code-input">
    <input
      v-for="(el, index) in [1, 2, 3, 4, 5]"
      :key="el"
      type="text"
      class="code-input__input"
      ref="codeInputs"
      placeholder="_"
      :value="codeModel[index]"
      :autofocus="index === 0"
      @keydown="keydownLogic"
      @input="inputLogic"
    />
  </div>
</template>

<script>
export default {
  name: "CodeInput",
  data() {
    return {
      modelValue: "",
      currentInput: 0,
    };
  },
  props: {
    codeModel: {
      type: Number,
      default: NaN,
    },
  },
  methods: {
    setInput() {
      const input = this.$refs.codeInputs[this.currentInput];
      input.focus();
    },
    keydownLogic(event) {
      if (event.keyCode === 8) {
        this.$refs.codeInputs[this.currentInput].value = "";
        this.modelValue =
          this.modelValue.slice(0, this.currentInput) +
          this.modelValue.slice(this.currentInput + 1, this.modelValue.length);
        this.currentInput =
          this.currentInput === 0 ? this.currentInput : this.currentInput - 1;
        event.preventDefault();
      }
      if (event.keyCode === 37) {
        this.currentInput--;
      }
      if (event.keyCode === 39) {
        this.currentInput++;
      }
      this.setInput();
    },
    inputLogic(event) {
      const input = event.target;
      const value = input.value;
      const numericValue = value.replace(/\D/g, "").slice(0, 1);
      const isLastElement = this.currentInput === 4;

      if (numericValue && !isLastElement) {
        this.currentInput += 1;
      }

      input.value = numericValue;
      this.modelValue += `${numericValue}`;
      this.$emit("update:codeModel", this.modelValue);
      this.setInput();
    },
  },
};
</script>

<style lang="scss">
.code-input {
  display: flex;
  justify-content: center;

  &__input {
    width: 50px;
    height: 50px;
    margin: 0 2px;
  }
}
</style>
