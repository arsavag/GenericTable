import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Table from '../components/Table';
import {
  setData,
  setPage,
  setPageSize,
  setSearchQuery,
  setSort,
  type TableData,
} from '../store/table.model';

const sampleData: TableData = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
];

afterEach(() => {
  // Reset table state between tests
  setSearchQuery('');
  setSort({ column: '', direction: null });
  setPageSize(10);
  setPage(1);
  setData([]);
});

describe('Table', () => {
  test('renders empty state when no data', async () => {
    render(<Table data={[]} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  test('renders headers derived from data keys', async () => {
    render(<Table data={sampleData} />);

    // Headers: drag handle column + id, name, age + Actions
    expect(screen.getByRole('columnheader', { name: /id/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /age/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /actions/i })).toBeInTheDocument();
  });

  test('filters rows via search input', async () => {
    const user = userEvent.setup();
    render(<Table data={sampleData} />);

    const search = screen.getByPlaceholderText('Search across all columns...');
    await user.type(search, 'bob');

    // Only Bob should be visible
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.queryByText('Charlie')).not.toBeInTheDocument();
  });

  test('sort toggles indicator on header click', async () => {
    const user = userEvent.setup();
    render(<Table data={sampleData} />);

    // Click on Name header to toggle sort
    const nameHeader = screen.getByRole('columnheader', { name: /name/i });

    // First click asc (↑)
    await user.click(nameHeader);
    expect(within(nameHeader).getByText('↑')).toBeInTheDocument();

    // Second click desc (↓)
    await user.click(nameHeader);
    expect(within(nameHeader).getByText('↓')).toBeInTheDocument();

    // Third click clears (↕)
    await user.click(nameHeader);
    expect(within(nameHeader).getByText('↕')).toBeInTheDocument();
  });

  test('deletes a row when clicking Delete', async () => {
    const user = userEvent.setup();
    render(<Table data={sampleData} />);

    // Ensure Alice is present
    expect(screen.getByText('Alice')).toBeInTheDocument();

    // Click the first Delete button
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await user.click(deleteButtons[0]);

    // Alice should be gone now
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
  });

  test('paginates when data exceeds page size', async () => {
    const user = userEvent.setup();
    const data = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, name: `User${i + 1}` }));

    render(<Table data={data} />);

    // Two pages should be rendered
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();

    // Page 1 visible item
    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.queryByText('User12')).not.toBeInTheDocument();

    // Go to page 2
    await user.click(screen.getByRole('button', { name: '2' }));
    expect(screen.getByText('User12')).toBeInTheDocument();
    expect(screen.queryByText('User1')).not.toBeInTheDocument();
  });
});


