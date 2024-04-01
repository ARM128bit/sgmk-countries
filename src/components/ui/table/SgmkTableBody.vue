<script setup lang="ts" generic="T">
import type { Col } from "@sgmk-types/index";
import SgmkCell from "./SgmkTableCell.vue";

interface DefaultProps {
  cols: Array<Col<T>>;
  rows: T[];
  rowKey?: keyof T;
}

withDefaults(defineProps<DefaultProps>(), {
  cols: () => [],
  rows: () => [],
  rowKey: "cca3",
});
</script>
<template>
  <tbody>
    <tr v-for="row in rows" :key="row[rowKey]" class="sgmk-row">
      <td v-for="col in cols" :key="col.name" class="sgmk-cell">
        <slot :name="`cell-${String(col.name)}`" :row="row">
          <sgmk-cell>
            <component
              v-if="col.component"
              :is="col.component"
              v-model="row[col.name]"
            />
            <template v-else>
              {{ row[col.name] }}
            </template>
          </sgmk-cell>
        </slot>
      </td>
    </tr>
  </tbody>
</template>

<style scoped lang="scss">
.sgmk-cell {
  border: 1px solid $color-gunmetal;
}
</style>
