<script>
/* eslint-disable */ 
import DotsButton from "./buttons/DotsButton.vue";
import BaseContextMenu from "./common/BaseContextMenu.vue";
import { ref } from "vue";
export default {
  name: "DropDownMenu",
  components: {
    DotsButton,
    BaseContextMenu,
  },
  props: {
    target: { type: Object, default: () => {} },
    menu: { type: Array, default: () => [] },
  },
  setup() {
    const menuState = ref(false);
    const openMenu = () => (menuState.value = true);
    const closeMenu = () => (menuState.value = false);

    return {
      menuState,
      openMenu,
      closeMenu,
    };
  },
};
</script>

<template>
  <div class="DropdownMenu" style="position: relative">
    <DotsButton @click="openMenu" :class="{'active': menuState}"/>
    <BaseContextMenu :activator="menuState" :menu="menu" :target="target" @close="closeMenu" />
  </div>
</template>
