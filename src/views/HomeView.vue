<script setup lang="ts">
import { Monster } from "@/service/Monster";
import { reactive } from "vue";

interface State {
  image?: string;
}

const MonsterService = new Monster();
const state = reactive<State>({ image: undefined });

const changeMonster = async () => {
  const { svg, error } = await MonsterService.getRandom();
  if (error) return console.error(error);

  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  state.image = url;
};
</script>

<template>
  <main>
    <h1>Pixelated world</h1>
    <button
      class="get-random"
      @click="changeMonster"
      :disabled="MonsterService.state.isLoading"
    >
      Get random monster
    </button>
    <img v-if="state.image" :src="state.image" />
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
button.get-random {
  padding: 5px 10px;
  font-size: 16px;
  border: none;
  border-radius: 0;
  background-color: brown;
  color: rgb(243, 232, 232);
  cursor: pointer;
}
button.get-random:hover {
  background-color: #771e1e;
}
button.get-random:active {
  background-color: #571616;
}
button.get-random:disabled {
  background-color: #4c4848;
  cursor: not-allowed;
}
</style>
