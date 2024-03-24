<script setup lang="ts">
import { ref } from "vue";
import type { Col } from "@sgmk-types/index";
import TextInput from "@components/ui/SgmkTextInput.vue";
import SgmkIcon from "@components/ui/SgmkIcon.vue";
import SgmkTable from "@components/ui/table/SgmkTemplateTable.vue";

const text = ref("");

const cols: Col[] = [
  {
    name: "id",
    label: "ID",
  },
];
</script>

<template>
  <main>
    <TextInput
      v-model="text"
      label="Поле поиска"
      id="test-text"
      placeholder="ddd"
    />
    <sgmk-table id="countries-table" :cols="cols" :data="[]" />
    <SgmkIcon />
  </main>
</template>
