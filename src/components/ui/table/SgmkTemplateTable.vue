<script setup lang="ts" generic="T">
import type { Col } from "@sgmk-types/index";
import SgmkTableBody from "./SgmkTableBody.vue";
import SgmkTableHeader from "./SgmkTableHeader.vue";
interface DefaultProps {
  id: string;
  data: T[];
  cols: Array<Col<T>>;
  rowKey?: string;
}

withDefaults(defineProps<DefaultProps>(), {
  id: "",
  data: () => [],
  cols: () => [],
  rowKey: "id",
});
</script>

<template>
  <table :id="id">
    <sgmk-table-header :cols="cols" />
    <sgmk-table-body :rows="data" :cols="cols" :rowKey="rowKey" />
  </table>
</template>

<style scoped></style>
