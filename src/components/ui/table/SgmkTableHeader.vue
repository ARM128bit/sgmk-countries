<script setup lang="ts" generic="T">
import type { Col } from "@sgmk-types/index";
import SgmkCell from "./SgmkTableCell.vue";

interface DefaultProps {
  cols: Array<Col<T>>;
}

withDefaults(defineProps<DefaultProps>(), {
  cols: () => [],
});
</script>
<template>
  <thead>
    <th v-for="col in cols" :key="col.name" class="sgmk-header-cell">
      <sgmk-cell>
        {{ col.label }}
      </sgmk-cell>
    </th>
  </thead>
</template>

<style scoped lang="scss">
.sgmk-header-cell {
  border: 1px solid $color-gunmetal;
}
</style>
