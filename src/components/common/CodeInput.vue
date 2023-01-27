<template>
<div class="code-input">
    <input type="number" class="code-input__input">
</div>
</template>

<script>
export default {
    name: "CodeInput",
    props: {
        modelValue: {
            type: Number,
            default: '',
        },
    }
}
</script>