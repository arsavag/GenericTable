import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

export const TableHeader = styled.thead`
  background: #f8f9fa;
`;

export const TableHeaderRow = styled.tr`
  border-bottom: 2px solid #dee2e6;
`;

export const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  user-select: none;
  position: relative;
  
  &:hover {
  }
  
  &:active {
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid #dee2e6;
  transition: background-color 0.2s;
  
  &:hover {
    background: #f8f9fa;
  }
`;

export const TableCell = styled.td`
  padding: 12px 16px;
  color: #212529;
  font-size: 14px;
`;

export const ActionCell = styled(TableCell)`
  text-align: right;
`;

export const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: #6c757d;
  font-size: 16px;
`;