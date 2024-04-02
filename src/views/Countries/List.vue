<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from "vue";
import type { Col } from "@sgmk-types/index";
import useList from "@hooks/useList";
import TextInput from "@components/ui/SgmkTextInput.vue";
import SgmkPaginator from "@components/ui/SgmkPaginator.vue";
import { useAppLanguageStore } from "@stores/appLanguage";
import { type Country } from "@stores/country";
import { getAllContries } from "@api/routes";
import { pageSizes } from "@hooks/usePaginator";

const SgmkTable = defineAsyncComponent(
  () => import("@components/ui/table/SgmkTemplateTable.vue")
);
const SgmkCell = defineAsyncComponent(
  () => import("@components/ui/table/SgmkTableCell.vue")
);
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
    <suspense>
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
      <template #fallback> Loading... </template>
    </suspense>
    <sgmk-select
      v-model="paginator.pagination.size"
      id="page-size-selector"
      :options="pageSizes"
      :option-id="(option: number) => option"
      :option-label="(option: number) => option.toString()"
      class="country__page-size"
    />
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
    margin: 10px;
  }
  &__paginator {
    padding: 10px;
  }
}
</style>
