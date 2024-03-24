import type { VNode } from "vue";

export type Order = 'asc' | 'desc'

export type SortOrder = {
    property: string,
    order: Order
}

export type TIcon = 'sort' | 'empty'

export type Col = {
    name: string;
    label: string;
    sort?: SortOrder;
    filter?: {
      name: string;
      form: VNode
    };
    width?: string;
  };
  