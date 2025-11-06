import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  margin: 20px 0;
`;


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

export const TableRow = styled.tr<{ $isDragging?: boolean; $isDraggedOver?: boolean }>`
  border-bottom: 1px solid #dee2e6;
  transition: background-color 0.2s;
  
  &:hover {
    background: #f8f9fa;
  }
  
  ${(props) =>
    props.$isDragging &&
    `
    opacity: 0.5;
    cursor: grabbing;
  `}
  
  ${(props) =>
    props.$isDraggedOver &&
    `
    background: #e3f2fd;
    border-top: 2px solid #4a90e2;
  `}
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

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 16px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const PaginationControls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const PaginationButton = styled.button<{ $disabled?: boolean; $active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: ${(props) => (props.$active ? '#4a90e2' : 'white')};
  color: ${(props) => (props.$active ? 'white' : '#495057')};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: ${(props) => (props.$active ? '#357abd' : '#f8f9fa')};
    border-color: ${(props) => (props.$active ? '#357abd' : '#4a90e2')};
  }
  
  &:disabled {
    opacity: 0.5;
  }
`;

export const SortIndicator = styled.span`
  margin-left: 8px;
  font-size: 12px;
  color: #4a90e2;
`;


export const DragHandleItem = styled.div`
  cursor: grab;
  padding: 4px;
  color: #6c757d;
  display: inline-flex;
  align-items: center;
  
  &:active {
    cursor: grabbing;
  }
  
  &:hover {
    color: #495057;
  }
`;

