import { createStore, createEvent } from 'effector';

export type TableData = Record<string, unknown>[];

export interface TableState {
    data: TableData;
}

export const initialState : TableState = {
    data: [],
};

export const $tableState = createStore<TableState>(initialState);


export const setData = createEvent<TableData>();

export const getAllKeys = (data: TableData): string[] => {
    const keys = new Set<string>();
    data.forEach(item => {
        Object.keys(item).forEach(key => keys.add(key));
    });
    return Array.from(keys);
};

export const $columns = $tableState.map(state => state.data.length > 0 ? getAllKeys(state.data) : []);

$tableState
    .on(setData, (state, data) => ({
        ...state,
        data,
    }));