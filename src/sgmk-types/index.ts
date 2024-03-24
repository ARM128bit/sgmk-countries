import type { AxiosResponse } from "axios";
import type { VNode } from "vue";

export type Order = 'asc' | 'desc'

export type SortOrder = {
    property: string,
    order: Order
}

export type TIcon = 'sort' | 'empty'

export type Col<T> = {
  name: keyof T;
  label: string;
  sort?: SortOrder;
  filter?: {
    name: string;
    form: VNode
  };
  width?: string;
};
 
export interface AxiosResponseList<T> extends AxiosResponse {
  data:  Array<T>
}

export type Paginator = {
  page: number
  total: number
}