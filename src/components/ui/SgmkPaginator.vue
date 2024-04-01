<script setup lang="ts">
import { UITranslations, useAppLanguageStore } from "@stores/appLanguage";
import type { Paginator } from "hooks/usePaginator";
import { computed } from "vue";

interface DefaultProps {
  paginator: Paginator;
  disabled: boolean;
}

const props = withDefaults(defineProps<DefaultProps>(), {
  disabled: false,
});

const langStore = useAppLanguageStore();

const paginatorTranslation = computed(() => {
  return UITranslations[langStore.currentLanguage?.id ?? "rus"].paginator;
});

const currentPage = computed({
  get() {
    return props.paginator.pagination.page || 1;
  },
  set(val: number) {
    props.paginator?.setPage(val);
  },
});

const isFirst = computed(() => {
  return currentPage.value === 1;
});

const isLast = computed(() => {
  return currentPage.value === props.paginator?.maxPage.value;
});
</script>

<template>
  <div class="paginator">
    <div
      class="paginator__btn paginator__btn--first"
      :class="{ 'paginator__btn--disabled': isFirst || disabled }"
      @click="() => (currentPage = 1)"
    >
      {{ paginatorTranslation.firstPage }}
    </div>
    <div
      class="paginator__btn paginator__btn--prev"
      :class="{ 'paginator__btn--disabled': isFirst || disabled }"
      @click="() => (currentPage -= 1)"
    >
      {{ paginatorTranslation.prevPage }}
    </div>
    <div
      v-for="p in props.paginator?.maxPage.value"
      class="paginator__page"
      :class="{
        'paginator__page--current': currentPage === p,
        'paginator__page--disabled': disabled,
      }"
      @click="() => (currentPage = p)"
    >
      {{ p }}
    </div>
    <div
      class="paginator__btn paginator__btn--next"
      :class="{ 'paginator__btn--disabled': isLast || disabled }"
      @click="() => (currentPage += 1)"
    >
      {{ paginatorTranslation.nextPage }}
    </div>
    <div
      class="paginator__btn paginator__btn--last"
      :class="{ 'paginator__btn--disabled': isLast || disabled }"
      @click="() => (currentPage = props.paginator.maxPage.value)"
    >
      {{ paginatorTranslation.lastPage }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.paginator {
  display: flex;
  &__page,
  &__btn {
    padding: 5px;
    cursor: pointer;
    border: 1px solid $color-light-silver;
    transition: all 0.3s ease;
  }
  &__page {
    &--current {
      background-color: $color-light-silver;
      cursor: auto;
    }
    &--disabled {
      background-color: $color-white-light-warm;
      color: $color-white;
    }
    &:not(&--disabled):not(&--current):hover {
      background-color: $color-light-silver;
    }
  }
  &__btn {
    &--disabled {
      cursor: auto;
    }

    &:not(&--disabled):not(&--current):hover {
      background-color: $color-light-silver;
    }
  }
}
</style>
