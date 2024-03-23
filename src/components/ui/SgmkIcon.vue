<script setup lang="ts">
import { computed, defineProps } from "vue";
import type { TIcon } from "@sgmk-types/index"

interface DefaultProps {
  icon: TIcon;
}

const props = withDefaults(defineProps<DefaultProps>(), {
  icon: "empty",
});

const iconClass = computed(() => {
  return ["md-" + props.icon];
});
</script>
<template>
  <i class="icon" :class="iconClass" />
</template>