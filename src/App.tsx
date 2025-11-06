import Table from './components/Table';
const sampleData1 = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, city: 'New York' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, city: 'Los Angeles' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, city: 'Chicago' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 28, city: 'Houston' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 32, city: 'Phoenix' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', age: 27, city: 'Philadelphia' },
  { id: 7, name: 'Eve Adams', email: 'eve@example.com', age: 29, city: 'San Antonio' },
  { id: 8, name: 'Frank Miller', email: 'frank@example.com', age: 33, city: 'San Diego' },
  { id: 9, name: 'Grace Lee', email: 'grace@example.com', age: 26, city: 'Dallas' },
  { id: 10, name: 'Henry Taylor', email: 'henry@example.com', age: 31, city: 'San Jose' },
  { id: 11, name: 'Iris White', email: 'iris@example.com', age: 24, city: 'Austin' },
  { id: 12, name: 'Jack Black', email: 'jack@example.com', age: 36, city: 'Jacksonville' },
];

// const sampleData1 = [
//   { product: 'Laptop', price: 999.99, stock: 15, name: 'Electronics' },
//   { product: 'Mouse', price: 29.99, stock: 100, category: 'Accessories' },
//   { product: 'Keyboard', price: 79.99, stock: 50, category: 'Accessories' },
//   { product: 'Monitor', price: 299.99, stock: 25, category: 'Electronics' },
// ];

function App() {
  return (
    <>
      <Table data={sampleData1} />
    </>
  )
}

export default App;
