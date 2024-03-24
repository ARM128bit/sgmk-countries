<script setup lang="ts" generic="T">
import type { Col } from "@sgmk-types/index";
import SgmkTableHeader from "./SgmkTableHeader.vue";
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
    <sgmk-table-header :cols="cols" />
  </table>
</template>

<style scoped></style>
