<script setup lang="ts">
import type { Col } from "@sgmk-types/index";

interface DefaultProps {
  cols: Col[];
}

withDefaults(defineProps<DefaultProps>(), {
  cols: () => [],
});
</script>
<template>
  <thead>
    <th v-for="col in cols" class="sgmk-header-cell">
      {{ col.label }}
    </th>
  </thead>
</template>

<style scoped lang="scss">
.sgmk-header-cell {
  border: 1px solid $color-gunmetal;
}
</style>
