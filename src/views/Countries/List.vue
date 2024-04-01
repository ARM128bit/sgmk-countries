<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import type { Col, SelectLabel } from "@sgmk-types/index";
import useList from "@hooks/useList";
import TextInput from "@components/ui/SgmkTextInput.vue";
import SgmkPaginator from "@components/ui/SgmkPaginator.vue";
import SgmkTable from "@components/ui/table/SgmkTemplateTable.vue";
import SgmkCell from "@components/ui/table/SgmkTableCell.vue";
import { useAppLanguageStore } from "@stores/appLanguage";
import { type Country } from "@stores/country";
import { getAllContries } from "@api/routes";
import SgmkSelect from "@components/ui/SgmkSelect.vue";
import { pageSizes } from "@hooks/usePaginator";

const langStore = useAppLanguageStore();

const { paginator, loadList, getList, loading } =
  useList<Country>(getAllContries);

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

const pageSizeOptions: SelectLabel[] = pageSizes.map<SelectLabel>((ps, idx) => {return {id: idx+1, label: ps.toString()}})
console.log(pageSizeOptions)
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
    <sgmk-table
      class="country__table"
      id="countries-table"
      :cols="cols"
      :data="getList"
    >
      <template #cell-name="{ row }: { row: Country }">
        <sgmk-cell>
          <text-input
            :id="`input-${row.cca3}`"
            :model-value="
              langStore.currentLanguage?.id &&
              langStore.currentLanguage.id !== 'eng'
                ? row.translations[langStore.currentLanguage?.id].official
                : row.name.official
            "
            disabled
          />
        </sgmk-cell>
      </template>
    </sgmk-table>
    <sgmk-select v-model="paginator.pagination.size" :options="pageSizes" class="country__page-size" />
    <sgmk-paginator
      class="country__paginator"
      :paginator="paginator"
      :disabled="loading"
    />
  </div>
</template>

<style scoped lang="scss">
.country {
  &__table {
    margin: 10px;
  }
  &__page-size {
    width: 150px;
  }
  &__paginator {
    padding: 10px;
  }
}
</style>
