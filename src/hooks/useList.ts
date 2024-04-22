import { computed, shallowRef, type Ref, ref } from "vue";
import usePaginator from "./usePaginator";
import { EnumApiServices } from "@sgmk-types/index";

export default function useList<T>(api?: Function) {
  const paginator = usePaginator();
  const list: Ref<T[]> = shallowRef([]);
  const loading: Ref<boolean> = ref(false);

  const loadList = async (service: EnumApiServices = EnumApiServices.all, code?: string, params: Record<string, any> = {}) => {
    if (!!api) {
      loading.value = true;
      try {
        const { data } = await api(service, code, params);
        setList(data);
        paginator.setTotal(data.length);
      } catch (e) {
        console.log(e);
      } finally {
        loading.value = false;
      }
    }
  };

  const setList = (data: T[]) => {
    list.value = data;
  }

  const getList = computed(() => {
    return list.value.slice(
      (paginator.pagination.page - 1) * paginator.pagination.size,
      paginator.pagination.page * paginator.pagination.size
    );
  });

  return { list, loading, paginator, getList, loadList, setList };
}
