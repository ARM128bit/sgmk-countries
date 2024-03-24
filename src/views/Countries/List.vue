<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Col } from "@sgmk-types/index";
import TextInput from "@components/ui/SgmkTextInput.vue";
import SgmkIcon from "@components/ui/SgmkIcon.vue";
import SgmkTable from "@components/ui/table/SgmkTemplateTable.vue";
import { useCountryStore, type Country } from "@stores/country";

const countryStore = useCountryStore();

const text = ref("");

const cols: Array<Col<Country>> = [
  {
    name: "cca3",
    label: "ID",
  },
  {
    name: "name",
    label: "Наименование",
  },
];

onMounted(() => {
  countryStore.loadList();
});
</script>
<template>
  <div>
    <text-input
      v-model="text"
      label="Поле поиска"
      id="test-text"
      placeholder="ddd"
    />
    <sgmk-table id="countries-table" :cols="cols" :data="countryStore.list" />
    <sgmk-icon />
  </div>
</template>

<style scoped></style>
