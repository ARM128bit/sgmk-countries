import { computed, shallowRef, type Ref, ref } from "vue";
import usePaginator from "./usePaginator";
import type { AxiosResponseList } from "@sgmk-types/index";

export default function useList<T>(
  api: () => Promise<AxiosResponseList<T>>,
) {
  const paginator = usePaginator()
  const list: Ref<T[]> = shallowRef([]);
  const loading: Ref<boolean> = ref(false);

  const loadList = async () => {
    loading.value = true
    try {
      const { data } = await api();
      list.value = data;
      paginator.setTotal(data.length);
    } catch(e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  };

  const getList = computed(() => {
    return list.value.slice(
      (paginator.pagination.page - 1) * paginator.pagination.size,
      paginator.pagination.page * paginator.pagination.size
    );
  });

  return { list, loading, paginator, getList, loadList };
}
