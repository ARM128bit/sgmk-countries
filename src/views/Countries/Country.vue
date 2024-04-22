<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
  watch,
  type ComputedRef,
  type ShallowRef,
} from "vue";
import { getCountryByService } from "@api/routes";
import IconFavorite from "@components/icons/IconFavorite.vue";
import SgmkMap from "@components/ui/map/SgmkMap.vue";
import { useCountryStore, type Country } from "@stores/country";
import { UITranslations, useAppLanguageStore } from "@stores/appLanguage";
import { EnumApiServices, type Col } from "@sgmk-types/index";
import { useViewedCountries } from "@hooks/useViewedCountries";

interface DefaultProps {
  cca3: Country["cca3"];
}

type KeyValueTable = {
  key: string;
  value: any;
};

const props = withDefaults(defineProps<DefaultProps>(), {
  cca3: "",
});

const langStore = useAppLanguageStore();
const countryStore = useCountryStore();
const viewedCountries = useViewedCountries();
const cardTranslation = computed(() => {
  return UITranslations[langStore.currentLanguageId].countryCard;
});

const showMap = ref(false);

const cols: Col<KeyValueTable>[] = [
  {
    name: "key",
    label: "key",
  },
  {
    name: "value",
    label: "value",
  },
];

const country: ShallowRef<Country | null> = ref(null);

const toggleFavourite = () => {
  if (country.value?.cca3) {
    if (!countryStore.favourites.has(country.value?.cca3)) {
      countryStore.favourites.add(country.value?.cca3);
    } else {
      countryStore.favourites.delete(country.value?.cca3);
    }
  }
};

const names: ComputedRef<KeyValueTable[]> = computed(() => {
  if (!country.value) return [];
  return [
    {
      key: cardTranslation.value.namesTable.common,
      value: country.value.name.common,
    },
    {
      key: cardTranslation.value.namesTable.official,
      value: country.value.name.official,
    },
    {
      key: cardTranslation.value.namesTable.localCommon,
      value: Object.values(country.value.name.nativeName)
        .map((value) => value.common)
        .join("; "),
    },
    {
      key: cardTranslation.value.namesTable.localOfficial,
      value: Object.values(country.value.name.nativeName)
        .map((value) => value.official)
        .join("; "),
    },
  ];
});

const translations: ComputedRef<KeyValueTable[]> = computed(() => {
  if (!country.value) return [];
  return Object.entries(country.value?.translations).map((entry) => {
    return {
      key: entry[0],
      value: entry[1].official,
    };
  });
});

const showTranslations = ref(false);

const geography: ComputedRef<KeyValueTable[]> = computed(() => {
  if (!country.value) return [];
  return [
    {
      key: cardTranslation.value.geography.region,
      value: country.value.region,
    },
    {
      key: cardTranslation.value.geography.subregion,
      value: country.value.subregion,
    },
    {
      key: cardTranslation.value.geography.capital,
      value: country.value.capital.join("; "),
    },
    {
      key: cardTranslation.value.geography.area,
      value: `${country.value.area} км²`,
    },
    {
      key: cardTranslation.value.geography.borders,
      value: country.value.borders,
    },
  ];
});

const loadCountry = async () => {
  const { data } = await getCountryByService<Country>(
    EnumApiServices.alpha,
    props.cca3
  );

  data[0].latlng.reverse();
  country.value = data[0];
};

watch(
  () => props.cca3,
  () => {
    loadCountry();
  }
);

onMounted(async () => {
  await loadCountry();
  if(country.value) viewedCountries.addViewedCountry(country.value?.cca3)
});
</script>

<template>
  <div v-if="country" class="country-card">
    <router-link :to="{ name: 'home' }">
      {{ cardTranslation.toCountriesListURL }}
    </router-link>
    <div class="country-card__header">
      <h2 class="country-card__title">
        {{ cardTranslation.title }}:
        {{
          country.translations[langStore.currentLanguageId]?.official ??
          country.name.official
        }}
        {{ country.flag }}
      </h2>
      <icon-favorite
        width="36px"
        height="36px"
        :active="countryStore.favourites.has(country.cca3)"
        @click="toggleFavourite()"
      />
    </div>
    <div class="country-card__tables">
      <div class="country-card__table">
        <h3 class="country-card__title">
          {{ cardTranslation.namesTable.title }}
        </h3>
        <sgmk-table
          id="names-table"
          row-key="key"
          :cols="cols"
          :show-header="false"
          :data="names"
        >
        </sgmk-table>
      </div>
      <div class="country-card__table">
        <div class="country-card__title-wrapper">
          <h3 class="country-card__title">
            {{ cardTranslation.translation.title }}
          </h3>
          <button @click="showTranslations = !showTranslations">
            {{ !showTranslations ? "Показать" : "Скрыть" }}
          </button>
        </div>

        <sgmk-table
          v-if="showTranslations"
          id="translations-table"
          class="country-card__table"
          row-key="key"
          :cols="cols"
          :show-header="false"
          :data="translations"
        >
        </sgmk-table>
      </div>
      <div class="country-card__table">
        <h3 class="country-card__title">
          {{ cardTranslation.geography.title }}
        </h3>
        <sgmk-table
          id="translations-table"
          class="country-card__table"
          row-key="key"
          :cols="cols"
          :show-header="false"
          :data="geography"
        >
          <template
            #cell-value="{
              row,
              rowIndex,
            }: {
              row: KeyValueTable;
              rowIndex: number;
            }"
          >
            <template v-if="rowIndex === 4">
              <sgmk-cell>
                <template v-for="b in row.value" :key="b">
                  <span>
                    <router-link :to="{ name: 'country', params: { cca3: b } }">
                      {{ b }} </router-link
                    >;
                  </span>
                </template>
              </sgmk-cell>
            </template>
          </template>
        </sgmk-table>
      </div>
    </div>
    <div class="country-card__show-map-btn">
      <button v-if="!showMap" @click="showMap = !showMap">
        {{ cardTranslation.showMap.visible }}
      </button>
      <button v-else @click="showMap = !showMap">
        {{ cardTranslation.showMap.hidden }}
      </button>
    </div>
    <div v-show="showMap" class="country-card__map">
      <sgmk-map
        :key="country.capitalInfo.latlng.join('')"
        :coordinates="country.latlng"
      >
      </sgmk-map>
    </div>
  </div>
</template>

<style scoped lang="scss">
.country-card {
  padding: 10px 0;
  &__header {
    display: flex;
    align-items: center;
  }
  &__title {
    padding-bottom: 5px;
    &-wrapper {
      display: flex;
      gap: 10px;
    }
  }
  &__tables {
    display: block;
    width: 50%;
  }
  &__table {
    margin-top: 10px;
  }
  &__show-map-btn {
    padding: 10px 0;
    cursor: pointer;
  }
  &__map {
    width: 100%;
    height: 800px;
  }
}
</style>
