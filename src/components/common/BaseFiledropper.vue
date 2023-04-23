<template>
    <div class="file-dropper"></div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(["file-dropped"]);

</script>