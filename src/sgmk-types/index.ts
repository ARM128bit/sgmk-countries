
export type Order = 'asc' | 'desc'

export type SortOrder = {
    property: string,
    order: Order
}

export type TIcon = 'sort' | 'empty'