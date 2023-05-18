<script>
export default {
  name: "BaseSearch",
  emits: ["onSearch"],
  setup(props, { emit }) {
    const onSearch = (e) => {
      const value = e.target.value;
      emit("onSearch", { value });
    };

    return {
      onSearch,
    };
  },
};
</script>

<template>
  <div class="search-input">
    <input type="text" placeholder="Enter nickname" @input="onSearch" />
  </div>
</template>

<style lang="scss">
.search-input {
  width: 100%;
  overflow: hidden;
  padding: 0.8rem;

  input {
    width: 100%;
    height: 3rem;
    border-radius: 0.5rem;
    border: 1px solid $color-placeholder;
    padding: 0.125rem 0.85rem;

    &:focus {
      border-color: $color-accent;

      @media (prefers-color-scheme: dark) {
        border-color: $color-accent-dark;
      }
    }
  }
}
</style>
