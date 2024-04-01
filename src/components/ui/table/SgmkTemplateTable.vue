<script setup lang="ts" generic="T">
import type { Col } from "@sgmk-types/index";
import SgmkTableBody from "./SgmkTableBody.vue";
import SgmkTableHeader from "./SgmkTableHeader.vue";

interface DefaultProps {
  id: string;
  data: T[];
  cols: Array<Col<T>>;
  rowKey?: keyof T;
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
    <sgmk-table-body :rows="data" :cols="cols">
      <template v-for="(_, slot) in $slots" v-slot:[slot]="slotData">
        <slot :name="slot" v-bind="slotData" ></slot>
      </template>
    </sgmk-table-body>
  </table>
</template>

<style scoped></style>
