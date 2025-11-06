import { Fragment, useEffect, useRef, useState } from 'react';
import { useUnit } from 'effector-react';
import {
  setData,
  setPage,
  setSort,
  reorderRows,
  $columns,
  $paginatedData,
  $totalItems,
  $tableState,
  $totalPages,
  type TableData,
  type SortDirection,
} from '../../store/table.model';
import {
  StyledTable,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
  TableBody,
  TableRow,
  TableCell,
  // ActionCell,
  EmptyState,
  PaginationContainer,
  PaginationControls,
  PaginationButton,
  TableContainer,
  SortIndicator,
  DragHandleItem,
} from './styles';

interface ITableProps {
  data: TableData;
}

export default function Table({ data }: ITableProps) {
  const [dragState, setDragState] = useState<{
    draggedIndex: number | null;
    draggedOverIndex: number | null;
  }>({
    draggedIndex: null,
    draggedOverIndex: null,
  });
  const dragItemRef = useRef<number | null>(null);

  const {
    currentPage,
    sortColumn,
    sortDirection,
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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };

  const handleSort = (column: string) => {
    let newDirection: SortDirection = 'asc';
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        newDirection = 'desc';
      } else if (sortDirection === 'desc') {
        newDirection = null;
      }
    }
    setSort({ column, direction: newDirection });
  };

  const renderSortIndicator = (column: string) => {
    if (sortColumn !== column) {
      return <SortIndicator>↕</SortIndicator>;
    }
    if (sortDirection === 'asc') {
      return <SortIndicator>↑</SortIndicator>;
    }
    if (sortDirection === 'desc') {
      return <SortIndicator>↓</SortIndicator>;
    }
    return <SortIndicator>↕</SortIndicator>;
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragItemRef.current = index;
    setDragState({ draggedIndex: index, draggedOverIndex: null });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (dragItemRef.current !== null && dragItemRef.current !== index) {
      setDragState((prev) => ({
        ...prev,
        draggedOverIndex: index,
      }));
    }
  };

  const handleDragLeave = () => {
    setDragState((prev) => ({
      ...prev,
      draggedOverIndex: null,
    }));
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    const dragIndex = dragItemRef.current;
    if (dragIndex !== null && dragIndex !== dropIndex) {
      reorderRows({ fromIndex: dragIndex, toIndex: dropIndex });
    }
    
    dragItemRef.current = null;
    setDragState({ draggedIndex: null, draggedOverIndex: null });
  };

  const handleDragEnd = () => {
    dragItemRef.current = null;
    setDragState({ draggedIndex: null, draggedOverIndex: null });
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

  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell style={{ width: '40px' }}>⋮⋮</TableHeaderCell>
            {columns.map((column) => (
              <TableHeaderCell
                key={column}
                onClick={() => handleSort(column)}
              >
                {column}
                {renderSortIndicator(column)}
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
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  $isDragging={dragState.draggedIndex === index}
                  $isDraggedOver={dragState.draggedOverIndex === index}
                >
                  <TableCell>
                    <DragHandleItem>⋮⋮</DragHandleItem>
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column}>{formatCellValue(row[column])}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
        </TableBody>
      </StyledTable>
      {totalItems > 0 && (
        <PaginationContainer>
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
                      onClick={() => handlePageChange(page)}
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
