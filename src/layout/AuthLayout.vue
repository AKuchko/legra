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
  height: 100vh;
  padding: 10px;

  &__wrapper {
    width: 100%;
    height: 100%;
  }
}
</style>