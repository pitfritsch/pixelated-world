<script setup lang="ts">
import { Monster } from "@/service/monster";
import { reactive } from "vue";

const state = reactive({ count: 1 });

const increment = () => state.count++;

Monster.getRandom();
</script>

<template>
  <h1>Pixelated world: {{ state.count }}</h1>
  <button @click="increment">Increment</button>
</template>
