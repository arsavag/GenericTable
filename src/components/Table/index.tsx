/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Fragment, useEffect } from 'react';
import { useUnit } from 'effector-react';
import {
  setData,
  $columns,
  $paginatedData,
  $totalItems,
  $tableState,
  $totalPages,
} from '../../store/table.model';
import {
  StyledTable,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
  TableBody,
  TableRow,
  TableCell,
  ActionCell,
  EmptyState,
  PaginationContainer,
  PaginationInfo,
  PaginationControls,
  PaginationButton,
  TableContainer,
} from './styles';

interface ITableProps {
  data: Record<string, unknown>[];
}

export default function Table({ data }: ITableProps) {
  const {
    pageSize,
    currentPage,
  } = useUnit($tableState); 
  
  const columns = useUnit($columns);
  const totalItems = useUnit($totalItems);
  const paginatedData = useUnit($paginatedData);
  const totalPages = useUnit($totalPages);

  const formatCellValue = (value: unknown): string => {
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  };

  useEffect(() => {
    setData(data);
  }, [data]);

  if (data.length === 0 && columns.length === 0) {
    return (
      <TableContainer>
        <EmptyState>No data</EmptyState>
      </TableContainer>
    );
  }
  // @ts-ignore
  const startItem = (currentPage - 1) * pageSize + 1;
  // @ts-ignore
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <TableHeaderRow>
            {columns.map((column) => (
                <TableHeaderCell
                  key={column}
                >
                  {column}
                </TableHeaderCell>
              ))}
              <TableHeaderCell style={{ width: '100px' }}>Actions</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1}>
                  <EmptyState>No results found</EmptyState>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => (
                <TableRow
                  key={index}
                >
                  {columns.map((column) => (
                    <TableCell key={column}>{formatCellValue(row[column])}</TableCell>
                  ))}
                  <ActionCell>
                  </ActionCell>
                </TableRow>
              ))
            )}
        </TableBody>
      </StyledTable>
      {totalItems > 0 && (
        <PaginationContainer>
          <PaginationInfo>
            Showing {startItem} to {endItem} of {totalItems} entries
          </PaginationInfo>
          <PaginationControls>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                );
              })
              .map((page, idx, arr) => {
                const showEllipsisBefore = idx > 0 && page - arr[idx - 1] > 1;
                return (
                  <Fragment key={page}>
                    {showEllipsisBefore && <span>...</span>}
                    <PaginationButton
                      $active={currentPage === page}
                    >
                      {page}
                    </PaginationButton>
                  </Fragment>
                );
              })}
          </PaginationControls>
        </PaginationContainer>
      )}
    </TableContainer>
  )
}
