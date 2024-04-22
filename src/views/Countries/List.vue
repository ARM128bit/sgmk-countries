<script setup lang="ts">
import { computed, onMounted, ref, type ComputedRef } from "vue";
import IconFavorite from "@components/icons/IconFavorite.vue";
import { EnumApiServices, type Col } from "@sgmk-types/index";
import { useCountryStore } from "@stores/country";
import { UITranslations, useAppLanguageStore } from "@stores/appLanguage";
import { type Country } from "@stores/country";
import { pageSizes } from "@hooks/usePaginator";
import { useViewedCountries } from "@hooks/useViewedCountries";

const countryStore = useCountryStore();
const langStore = useAppLanguageStore();
const viewedCountries = useViewedCountries();
const countryListFilter = computed(() => {
  return UITranslations[langStore.currentLanguageId].countryListFilter;
});
const countryList = computed(() => {
  return UITranslations[langStore.currentLanguageId].countryList;
});
const toggleFavourite = (cca3: Country["cca3"]) => {
  if (countryStore.favourites.has(cca3)) {
    countryStore.favourites.delete(cca3);
  } else {
    countryStore.favourites.add(cca3);
  }
  if (countryStore.offlineFilter.onlyFavourites) {
    countryStore.paginator.setTotal(countryStore.favourites.size);
  }
};
const text = ref("");

const cols: ComputedRef<Col<Country, "action" | "viewed">[]> = computed(() => ([
  {
    name: "cca3",
    label: "ID",
  },
  {
    name: "name",
    label: countryList.value.columns.name,
  },
  {
    name: "viewed",
    label: countryList.value.columns.viewed,
  },
  {
    name: "action",
    label: "",
  },
]));

const onSearch = () => {
  if (text.value) {
    countryStore.loadList(EnumApiServices.translation, text.value);
    return;
  }
  countryStore.loadList();
};

onMounted(() => {
  countryStore.loadList();
});
</script>
<template>
  <div class="country">
    <div class="country__filter">
      <text-input
        v-model="text"
        id="test-text"
        :label="countryListFilter.search"
        placeholder=""
        :disabled="countryStore.loading"
      />
      <sgmk-button @click="onSearch" :disabled="countryStore.loading">{{
        countryListFilter.searchBtn
      }}</sgmk-button>
      <label>
        <input
          v-model="countryStore.offlineFilter.onlyFavourites"
          :disabled="
            countryStore.favourites.size === 0 &&
            !countryStore.offlineFilter.onlyFavourites
          "
          type="checkbox"
        />
        {{ countryListFilter.onlyFavourites }}
      </label>
    </div>
    <sgmk-table
      class="country__table"
      id="countries-table"
      row-key="cca3"
      :cols="cols"
      :data="countryStore.getList"
    >
      <template #cell-cca3="{ row }: { row: Country }">
        <sgmk-cell>
          <router-link :to="{ name: 'country', params: { cca3: row.cca3 } }">
            {{ row.cca3 }}
          </router-link>
        </sgmk-cell>
      </template>
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
      <template #cell-viewed="{ row }: { row: Country }">
        <sgmk-cell>
          <span v-if="viewedCountries.viewed.has(row.cca3)"> {{ countryList.viewed }} </span>
        </sgmk-cell>
      </template>
      <template #cell-action="{ row }: { row: Country }">
        <sgmk-cell>
          <icon-favorite
            :active="countryStore.favourites.has(row.cca3)"
            @click="toggleFavourite(row.cca3)"
          />
        </sgmk-cell>
      </template>
    </sgmk-table>
    <sgmk-select
      v-model="countryStore.paginator.pagination.size"
      id="page-size-selector"
      :options="pageSizes"
      :option-id="(option: number) => option"
      :option-label="(option: number) => option.toString()"
      class="country__page-size"
    />
    <sgmk-paginator
      class="country__paginator"
      :paginator="countryStore.paginator"
      :disabled="countryStore.loading"
    />
  </div>
</template>

<style scoped lang="scss">
.country {
  &__filter {
    margin: 10px;
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }
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
