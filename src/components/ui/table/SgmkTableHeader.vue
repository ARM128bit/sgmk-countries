<script setup lang="ts">
import type { Col } from './types';

interface DefaultProps {
  cols: Col[];
}

withDefaults(defineProps<DefaultProps>(), {
  cols: () => [],
});
</script>
<template>
    <thead>
        <th v-for="col in cols">
            {{ col.label }}
        </th>
    </thead>
</template>

<style scoped>

</style>