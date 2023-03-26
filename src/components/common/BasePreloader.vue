<template>
  <div class="preloader">
    <Icon icon="svg-spinners:3-dots-bounce" />
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "BasePreloader",
  components: { Icon },
};
</script>
