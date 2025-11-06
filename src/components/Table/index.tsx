import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import {
  setData,
  $columns,
} from '../../store/table.model';
import {
  StyledTable,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
} from './styles';

interface ITableProps {
  data: Record<string, unknown>[];
}

export default function Table({ data }: ITableProps) {
  const columns = useUnit($columns);

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
        </TableHeaderRow>
      </TableHeader>
    </StyledTable>
  )
}
