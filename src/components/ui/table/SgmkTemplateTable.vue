<script setup lang="ts" generic="T">
import type {  Col } from "./types"
interface DefaultProps {
  id: string;
  data: T[];
  cols: Col[];
}

withDefaults(defineProps<DefaultProps>(), {
  id: "",
  data: () => [],
  cols: () => [],
});
</script>

<template>
  <table :id="id">

  </table>
</template>

<style scoped></style>
