<script>
import TransitionSlide from "@/components/transitions/TransitionSlide.vue";

export default {
  name: "AuthLayout",
  components: { TransitionSlide },
};
</script>

<template>
  <div class="auth-layout bg">
    <router-view v-slot="{ Component }">
      <transition name="auth-slide">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss">
.auth-layout {
  width: 100vw;
  height: 100%;
  overflow: hidden;
}

.auth-slide-enter-active,
.auth-slide-leave-active {
  transition: 0.5s;
  transform: translate(0, 0);
}

.auth-slide-enter-from {
  position: absolute;
  top: 0;
  opacity: 0;
  transform: translate(100%, 0);
}

.auth-slide-leave-to {
  position: absolute;
  top: 0;
  opacity: 0;
  transform: translate(-100%, 0);
}
</style>
