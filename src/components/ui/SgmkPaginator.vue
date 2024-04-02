<script setup lang="ts">
import { computed } from "vue";
import type { Paginator } from "hooks/usePaginator";
import { UITranslations, useAppLanguageStore } from "@stores/appLanguage";

interface DefaultProps {
  paginator: Paginator;
  disabled: boolean;
  sectionSize: number;
}

const props = withDefaults(defineProps<DefaultProps>(), {
  disabled: false,
  sectionSize: 3,
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

const middlePagesSection = computed(() => {
  if (currentPage.value === props.sectionSize) {
    return [currentPage.value + 1];
  }
  if (currentPage.value === props.sectionSize + 1) {
    return [currentPage.value, currentPage.value + 1];
  }

  if (currentPage.value === props.paginator?.maxPage.value - 2) {
    return [currentPage.value - 1];
  }
  if (currentPage.value === props.paginator?.maxPage.value - 3) {
    return [currentPage.value - 1, currentPage.value];
  }
  return [currentPage.value - 1, currentPage.value, currentPage.value + 1];
});

const lastPagesSection = computed(() => {
  return [
    props.paginator?.maxPage.value - 2,
    props.paginator?.maxPage.value - 1,
    props.paginator?.maxPage.value,
  ];
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
    <template v-if="props.paginator?.maxPage.value <= sectionSize * 2">
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
    </template>
    <template v-else>
      <div
        v-for="p in sectionSize"
        class="paginator__page"
        :class="{
          'paginator__page--current': currentPage === p,
          'paginator__page--disabled': disabled,
        }"
        @click="() => (currentPage = p)"
      >
        {{ p }}
      </div>
      <div v-if="currentPage > sectionSize + 1" class="paginator__dots">
        ...
      </div>
      <div
        v-if="
          currentPage >= sectionSize &&
          currentPage <= props.paginator?.maxPage.value - 2
        "
        v-for="p in middlePagesSection"
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
        v-if="currentPage < props.paginator?.maxPage.value - 3"
        class="paginator__dots"
      >
        ...
      </div>
      <div
        v-for="p in lastPagesSection"
        class="paginator__page"
        :class="{
          'paginator__page--current': currentPage === p,
          'paginator__page--disabled': disabled,
        }"
        @click="() => (currentPage = p)"
      >
        {{ p }}
      </div>
    </template>
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
  &__dots {
    display: flex;
    align-items: flex-end;
    padding: 0 5px;
  }
  &__page,
  &__btn {
    text-align: center;
    padding: 5px;
    cursor: pointer;
    border: 1px solid $color-light-silver;
    transition: all 0.3s ease;
  }
  &__page {
    width: 30px;
    margin-right: 1px;
    &--current {
      background-color: $color-light-silver;
      cursor: default;
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
    &--prev {
      margin-right: 1px;
    }
    &--disabled {
      cursor: default;
    }

    &:not(&--disabled):not(&--current):hover {
      background-color: $color-light-silver;
    }
  }
}
</style>
