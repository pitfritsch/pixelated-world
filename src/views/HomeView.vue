<script setup lang="ts">
import Monster, { type MonsterWithId } from "@/service/Monster";
import { reactive } from "vue";
import Button from "@/components/Button.vue";
import Loader from "@/components/Loader.vue";

interface State {
  monsters: MonsterWithId[];
  image?: string;
}

const MonsterService = new Monster();
const state = reactive<State>({ image: undefined, monsters: [] });

const changeMonster = async () => {
  const { svg, error } = await MonsterService.getRandom();
  if (error) return console.error(error);

  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  state.image = url;
};

const getAllMonsters = async (page: number) => {
  const { result = [], error } = await MonsterService.getAll(page);
  if (error) return console.error(error);
  state.monsters = result.map((r) => {
    const blob = new Blob([r.svgContent], { type: "image/svg+xml" });
    return { id: r.id, svgContent: URL.createObjectURL(blob) };
  });
};

getAllMonsters(1);
</script>

<template>
  <main>
    <h1>Pixelated world</h1>
    <div class="listing">
      <button v-for="monster in state.monsters" class="monster">
        <img :src="monster.svgContent" />
      </button>
    </div>
    <Button
      :click="() => getAllMonsters(MonsterService.state.currentPage - 1)"
      text="Voltar"
      :isLoading="MonsterService.state.isLoading"
    />
    <Button
      :click="() => getAllMonsters(MonsterService.state.currentPage + 1)"
      text="Avançar"
      :isLoading="MonsterService.state.isLoading"
    />
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
.listing {
  display: grid;
  width: 500px;
  grid-template-columns: repeat(4, auto);
  gap: 20px;
}
button.monster {
  padding: 20px;
  background: rgb(255, 255, 255);
  background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, #c8c8c8 100%);
  cursor: pointer;
}
button.monster:hover,
button.monster:focus {
  transform: scale(1.2);
}
button.monster:active {
  transform: scale(1.1);
}

@media (max-width: 600px) {
  .listing {
    width: 90vw;
  }
}
</style>
