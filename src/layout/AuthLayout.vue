<template>
  <div class="auth-layout">
    <div class="auth-layout__wrapper">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.auth-layout {
  width: 100vw;
  background-color: $color-light-bg;

  &__wrapper {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    max-width: 25.5rem;
    padding: 100px 25px;
  }
}
</style>
