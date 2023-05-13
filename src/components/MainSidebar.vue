<script>
/* eslint-disable */ 
import BaseBlock from "./common/BaseBlock.vue";
import TransitionSlide from "./transitions/TransitionSlide.vue";
import MainLayer from "./sidebarLayers/MainLayer.vue";
import { Icon } from "@iconify/vue";
import { computed, markRaw } from "vue";
import { useStore } from "vuex";

export default {
  name: "MainSidebar",
  components: { MainLayer, BaseBlock, Icon, TransitionSlide },
  setup() {
    const store = useStore();
    const view = markRaw(computed(() => store.getters.sidebarComponent));
    return {
      view,
    }
  },
};
</script>

<template>
  <div class="sidebar">
      <Suspense>
        <template #default>
            <transition-slide>
              <component :is="view" :key="view.name" />
            </transition-slide>
          </template>
          <template #fallback>
            <h1>loading...</h1>
          </template>
      </Suspense>
    </div>
</template>

<style lang="scss">
.sidebar {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: $color-light-bg;
}
</style>
