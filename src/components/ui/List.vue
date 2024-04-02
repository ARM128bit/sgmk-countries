<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Col } from "@sgmk-types/index";
import useList from "@hooks/useList";
import TextInput from "@components/ui/SgmkTextInput.vue";
import SgmkPaginator from "@components/ui/SgmkPaginator.vue";
import SgmkTable from "@components/ui/table/SgmkTemplateTable.vue";
import SgmkCell from "@components/ui/table/SgmkTableCell.vue";
import { type Country } from "@stores/country";
import { getAllContries } from "@api/routes";

const { loadList, paginator, getList } = useList<Country>(getAllContries);

// const getList = computed(() => {
//   return list.value.slice(
//     (paginator.pagination.page - 1) * paginator.pagination.size,
//     paginator.pagination.page * paginator.pagination.size
//   );
// });

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
  loadList();
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
    <sgmk-table id="countries-table" :cols="cols" :data="getList">
      <template #cell-name="{ row }: { row: Country }">
        <sgmk-cell>
          <text-input
            :id="`input-${row.cca3}`"
            :model-value="row.name.official"
            disabled
          />
        </sgmk-cell>
      </template>
    </sgmk-table>
    <sgmk-paginator :paginator="paginator" />
  </div>
</template>

<style scoped></style>
