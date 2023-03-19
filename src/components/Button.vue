<script setup lang="ts">
import Loader from "./Loader.vue";

const props = defineProps({
  click: Function,
  isLoading: Boolean,
  text: String,
});
</script>

<template>
  <button class="default" @click="props.click" :disabled="props.isLoading">
    <Loader v-if="props.isLoading" bgColor="#4c4848" size="16px" />
    <span v-else>
      {{ props.text }}
    </span>
  </button>
</template>

<style>
button.default {
  min-width: 150px;
  min-height: 30px;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 0;
  background-color: brown;
  color: rgb(243, 232, 232);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
button.default:hover {
  background-color: #771e1e;
}
button.default:active {
  background-color: #571616;
}
button.default:disabled {
  background-color: #4c4848;
  cursor: not-allowed;
}
</style>
