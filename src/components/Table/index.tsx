import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import {
  setData,
  $columns,
  $paginatedData,
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
} from './styles';

interface ITableProps {
  data: Record<string, unknown>[];
}

export default function Table({ data }: ITableProps) {
  const columns = useUnit($columns);
  const paginatedData = useUnit($paginatedData);

  console.log(columns);

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
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
                  <TableCell key={column}>{String(row[column])}</TableCell>
                ))}
                <ActionCell>
                </ActionCell>
              </TableRow>
            ))
          )}
      </TableBody>
    </StyledTable>
  )
}
