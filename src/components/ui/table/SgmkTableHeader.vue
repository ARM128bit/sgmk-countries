<script setup lang="ts" generic="T">
import type { Col } from "@sgmk-types/index";

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
      {{ col.label }}
    </th>
  </thead>
</template>

<style scoped lang="scss">
.sgmk-header-cell {
  border: 1px solid $color-gunmetal;
}
</style>
