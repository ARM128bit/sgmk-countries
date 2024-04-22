<script setup lang="ts" generic="T, K extends keyof T">
import type { Col } from "@sgmk-types/index";
import SgmkTableBody from "./SgmkTableBody.vue";
import SgmkTableHeader from "./SgmkTableHeader.vue";

interface DefaultProps {
  id: string;
  rowKey?: K;
  data: T[];
  cols: Col<T>[];
  showHeader?: boolean
}

withDefaults(defineProps<DefaultProps>(), {
  showHeader: true,
});

</script>

<template>
  <table :id="id">
    <sgmk-table-header v-if="showHeader" :cols="cols" />
    <sgmk-table-body :rows="data" :cols="cols" :row-key="(rowKey as K)">
      <template v-for="(_, slot) in $slots" v-slot:[slot]="slotData">
        <slot :name="slot" v-bind="slotData" ></slot>
      </template>
    </sgmk-table-body>
  </table>
</template>

<style scoped></style>
