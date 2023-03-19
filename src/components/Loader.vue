<script setup lang="ts">
import { computed, type StyleValue } from "vue";

const props = defineProps(["color", "bgColor", "size"]);
const style = computed((): StyleValue => {
  return {
    borderColor: props.color,
    borderTopColor: props.bgColor,
    height: props.size,
  };
});
</script>

<template>
  <div class="loader" :style="style" />
</template>

<style>
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

div.loader {
  animation: rotate 500ms linear infinite;
  border: 1px solid white;
  border-radius: 50%;
  z-index: 1000;
  height: 25px;
  aspect-ratio: 1/1;
}
</style>
