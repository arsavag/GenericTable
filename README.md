# Generic Table Component

A flexible and feature-rich React table component built with TypeScript, Effector state management, and styled-components. The table supports dynamic data structures, sorting, searching, pagination, and row reordering.

## Features

- Dynamic column generation from any data structure
- Global search across all columns
- Sortable columns (click column headers)
- Pagination with configurable page size
- Drag-and-drop row reordering
- Row deletion
- Responsive design with horizontal scrolling
- Styled with styled-components
- Full TypeScript support
- Example datasets included

## Quick Start

### Prerequisites

- Node.js 16+ 
- npm 7+ (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/arsavag/GenericTable.git
cd GenericTable
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown in the terminal (typically http://localhost:5173)

## Architecture

### Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety and developer experience
- **Effector** - State management
- **styled-components** - Component styling
- **Vite** - Build tool and dev server

### Project Structure

```
src/
  ├── components/
  │   └── Table/
  │       ├── index.tsx    # Main table component
  │       └── styles.ts    # Styled components
  │
  ├── store/
  │   └── table.model.ts   # Effector state management
  │
  ├── App.tsx             # Example usage & data structures
  └── main.tsx           # App entry point
```

### Key Design Decisions

1. **Dynamic Column Generation**
   - Columns are automatically generated from data keys
   - Supports nested objects and inconsistent data structures
   - Uses JSON.stringify for complex values

2. **State Management with Effector**
   - Centralized state management for table operations
   - Separate stores for different table aspects (sorting, pagination, etc.)
   - Efficient updates with fine-grained reactivity

3. **Styling Approach**
   - Styled-components for dynamic, prop-based styling
   - Responsive design with mobile considerations
   - Consistent theme variables for colors and spacing

4. **Type Safety**
   - Generic types for table data
   - Runtime type checking for dynamic data
   - Full TypeScript coverage

## Usage

```tsx
import Table from './components/Table';

// Your data can have any structure
const data = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
];

function App() {
  return <Table data={data} />;
}
```

### Supported Data Structures

The table handles various data structures:

1. **Flat Objects**
```typescript
{ id: 1, name: 'John', email: 'john@example.com' }
```

2. **Mixed/Inconsistent Keys**
```typescript
[
  { id: 1, name: 'One', value: 10 },
  { uid: 'x2', title: 'Two', amount: 20 }
]
```

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Testing

This project uses **Jest** with **React Testing Library**.

### Commands

```bash
# run tests once
npm test

# watch mode
npm run test:watch
``

### Test Location

- Tests live under `src/__tests__/`
- Example: `src/__tests__/Table.test.tsx`

### Notes

- JSDOM environment is configured via `jest.config.ts`
- Setup file: `src/setupTests.ts` (adds `@testing-library/jest-dom` matchers)

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## License

This project is MIT licensed.
