<template>
  <div class="auth-layout">
    <div class="auth-layout__wrapper">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.auth-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: $color-light-bg;

  &__wrapper {
    width: 100%;
    height: 100%;
    max-width: 25.5rem;
    padding: 100px 25px;
  }
}
</style>
