import { createStore, createEvent } from 'effector';

export type TableData = Record<string, unknown>[];
export type SortDirection = 'asc' | 'desc' | null;
export interface TableState {
  data: TableData;
  filteredData: TableData;
  searchQuery: string;
  sortColumn: string | null;
  sortDirection: SortDirection;
  currentPage: number
  pageSize: number;
}

const initialState: TableState = {
  data: [],
  filteredData: [],
  searchQuery: '',
  sortColumn: null,
  sortDirection: null,
  currentPage: 1,
  pageSize: 10,
};

export const $tableState = createStore<TableState>(initialState);


export const setData = createEvent<TableData>();
export const setSearchQuery = createEvent<string>();
export const setSort = createEvent<{ column: string; direction: SortDirection }>();
export const setPage = createEvent<number>();
export const setPageSize = createEvent<number>();

export const getAllKeys = (data: TableData): string[] => {
    const keys = new Set<string>();
    data.forEach(item => {
        Object.keys(item).forEach(key => keys.add(key));
    });
    return Array.from(keys);
};

const searchData = (data: TableData, query: string): TableData => {
  if (!query.trim()) return data;
  const queryLower = query.toLowerCase();
  const keys = getAllKeys(data);
  
  return data.filter((row) =>
    keys.some((key) => {
      const value = row[key];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(queryLower);
    })
  );
};
const sortData = (data: TableData, column: string, direction: SortDirection): TableData => {
  if (!direction) return data;
  
  return [...data].sort((a, b) => {
    const aVal = a[column];
    const bVal = b[column];
    
    if (aVal === null || aVal === undefined) return direction === 'asc' ? 1 : -1;
    if (bVal === null || bVal === undefined) return direction === 'asc' ? -1 : 1;
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();
    
    if (aStr < bStr) return direction === 'asc' ? -1 : 1;
    if (aStr > bStr) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

$tableState
  .on(setData, (state, data) => {
    const filtered = searchData(data, state.searchQuery);
    const sorted = state.sortColumn && state.sortDirection
      ? sortData(filtered, state.sortColumn, state.sortDirection)
      : filtered;
    
    return {
      ...state,
      data,
      filteredData: sorted,
      currentPage: 1,
    };
  })
  .on(setSearchQuery, (state, searchQuery) => {
    const filtered = searchData(state.data, searchQuery);
    const sorted = state.sortColumn && state.sortDirection
      ? sortData(filtered, state.sortColumn, state.sortDirection)
      : filtered;
    
    return {
      ...state,
      searchQuery,
      filteredData: sorted,
      currentPage: 1,
    };
  })
  .on(setSort, (state, { column, direction }) => {
    const sorted = direction
      ? sortData(state.filteredData, column, direction)
      : state.filteredData;
    
    return {
      ...state,
      sortColumn: direction ? column : null,
      sortDirection: direction,
      filteredData: sorted,
      currentPage: 1,
    };
  })
  .on(setPage, (state, currentPage) => ({
    ...state,
    currentPage,
  }))
  .on(setPageSize, (state, pageSize) => ({
    ...state,
    pageSize,
    currentPage: 1,
  }))

export const $columns = $tableState.map(state => state.data.length > 0 ? getAllKeys(state.data) : []);

export const $paginatedData = $tableState.map((state) => {
  const start = (state.currentPage - 1) * state.pageSize;
  const end = start + state.pageSize;
  return state.filteredData.slice(start, end);
});

export const $totalPages = $tableState.map((state) =>
  Math.ceil(state.filteredData.length / state.pageSize) || 1
);

export const $totalItems = $tableState.map((state) => state.filteredData.length);

