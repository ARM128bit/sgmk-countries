<script setup lang="ts" generic="T">
import type { Col } from "@sgmk-types/index";

interface DefaultProps {
  cols: Array<Col<T>>;
  rows: T[];
  rowKey: string;
}

withDefaults(defineProps<DefaultProps>(), {
  cols: () => [],
  rows: () => [],
  rowKey: "id",
});
</script>
<template>
  <tbody>
    <tr v-for="row in rows" :key="row[rowKey]" class="sgmk-row">
      <td v-for="col in cols" :key="col.name" class="sgmk-cell">
        <slot :name="`cell-${String(col.name)}-${row[rowKey]}`">
          {{ row[col.name] }}
        </slot>
      </td>
    </tr>
  </tbody>
</template>

<style scoped lang="scss">
.sgmk-row {
}
.sgmk-cell {
  border: 1px solid $color-gunmetal;
}
</style>
