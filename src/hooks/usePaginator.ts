import { computed, reactive, type ComputedRef, watch } from "vue";

export type Pagination = {
  page: number;
  size: number;
  total: number;
};

export type Paginator = {
  pagination: Pagination;
  maxPage: ComputedRef<number>;
  setPage: (val: number) => void;
  setTotal: (val: number) => void;
  togglePage: (val: number) => void;
};

export const pageSizes = [5, 10, 25, 50, 100];

export default function usePaginator(): Paginator {
  const pagination: Pagination = reactive({
    page: 1,
    size: 10,
    total: 0,
  });

  const maxPage = computed(() => Math.ceil(pagination.total / pagination.size));

  const togglePage = (val: number = 1) => {
    if (pagination.page + val === maxPage.value || pagination.page + val === 1)
      return;
    pagination.page = pagination.page + val;
  };

  const setPage = (val: number) => {
    if (val > maxPage.value || val < 1) return;
    pagination.page = val;
  };

  const setTotal = (val: number) => {
    pagination.total = val;
  };

  watch(
    pagination,
    () => {
      if (maxPage.value < pagination.page) pagination.page = maxPage.value;
    }
  );

  return { pagination, togglePage, setTotal, setPage, maxPage };
}
