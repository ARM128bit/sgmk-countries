<script setup lang="ts" generic="T, K extends keyof T">
import type { Col } from "@sgmk-types/index";
import { UITranslations, useAppLanguageStore } from "@stores/appLanguage";
import SgmkCell from "./SgmkTableCell.vue";
import { computed } from "vue";

interface DefaultProps {
  cols: Array<Col<T>>;
  rows: T[];
  rowKey: K;
}

defineProps<DefaultProps>();
const langStore = useAppLanguageStore();
const tableTranslation = computed(() => {
  return UITranslations[langStore.currentLanguageId].table;
});
</script>
<template>
  <tbody>
    <tr
      v-for="(row, idx) in rows"
      :key="row[rowKey as K] as string | number | symbol"
      class="sgmk-row"
    >
      <td v-for="col in cols" :key="col.name" class="sgmk-cell">
        <slot :name="`cell-${String(col.name)}`" :row="row" :rowIndex="idx">
          <sgmk-cell>
            {{ row[col.name as K] as any }}
          </sgmk-cell>
        </slot>
      </td>
    </tr>
    <tr v-if="rows.length === 0">
      <td :colspan="cols.length">
        <slot>{{ tableTranslation.empltyList }}</slot>
      </td>
    </tr>
  </tbody>
</template>

<style scoped lang="scss">
.sgmk-cell {
  border: 1px solid var(--color-border);
}
</style>
