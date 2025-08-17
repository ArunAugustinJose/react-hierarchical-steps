# React Hierarchical Steps

A flexible React component library for displaying hierarchical data with multiple navigation modes and customizable styling.

## Features

- **Multiple Navigation Modes**: Tree view and Breadcrumb navigation
- **Tree Display Modes**: Standard tree and Organizational chart layouts  
- **Breadcrumb Layouts**: Grid and List views
- **Fully Customizable**: Custom card rendering, popover forms, and styling
- **TypeScript Support**: Full type safety and IntelliSense
- **Responsive Design**: Mobile-first approach with CSS modules
- **Theme Support**: Light and dark themes
- **Edit & Add Functionality**: Built-in CRUD operations with callbacks

## Installation

```bash
npm install react-hierarchical-steps
# or
yarn add react-hierarchical-steps
```

## Quick Start

```tsx
import { StepNavigator } from 'react-hierarchical-steps';
import type { StepItem } from 'react-hierarchical-steps';

const data: StepItem[] = [
  {
    title: "WiFi Issues",
    description: "Troubleshoot connectivity problems",
    editable: true,
    enableAddChild: true,
    children: [
      {
        title: "Check Router",
        description: "Verify router status",
        editable: true
      },
      {
        title: "Restart Device", 
        editable: true
      }
    ]
  }
];

function App() {
  const handleEdit = (item, data, path) => {
    console.log('Edit:', item, data, path);
  };

  const handleAdd = (parent, data, path) => {
    console.log('Add:', parent, data, path);
  };

  return (
    <StepNavigator
      data={data}
      mode="breadcrumb" // or "tree"
      enableEdit={true}
      enableAdd={true}
      onEdit={handleEdit}
      onAdd={handleAdd}
      theme="light"
    />
  );
}
```

## Development Setup

### 1. Clone and Install
```bash
git clone <your-repo>
cd react-hierarchical-steps
npm install
```

### 2. Run Demo
```bash
# Start demo development server
npm run demo

# Build demo
npm run build:demo
```

The demo will be available at `http://localhost:3000`

### 3. Build Library
```bash
# Build the library for distribution
npm run build

# Type checking
npm run type-check
```

### 4. Project Structure
```
src/
├── StepNavigator.tsx          # Main component
├── AddEditPopover.tsx         # Popover form component  
├── TreeNodeStandard.tsx       # Standard tree display
├── TreeNodeOrganizational.tsx # Org chart display
├── BreadcrumbNavigation.tsx   # Breadcrumb navigation
├── StepNavigator.module.css   # CSS modules styling
├── types.ts                   # TypeScript definitions
├── index.ts                   # Library exports
├── Demo.tsx                   # Demo component
├── main.tsx                   # Demo entry point
└── index.html                 # Demo HTML
```

## Props Reference

### StepNavigatorProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `StepItem[]` | Required | Hierarchical data array |
| `mode` | `'tree' \| 'breadcrumb'` | `'breadcrumb'` | Navigation mode |
| `treeDisplayMode` | `'standard' \| 'organizational'` | `'standard'` | Tree layout style |
| `breadcrumbDisplayMode` | `'grid' \| 'list'` | `'grid'` | Breadcrumb layout |
| `showConnectingLines` | `boolean` | `true` | Show tree connecting lines |
| `enableEdit` | `boolean` | `false` | Enable edit functionality |
| `enableAdd` | `boolean` | `false` | Enable add functionality |
| `onEdit` | `Function` | - | Edit callback |
| `onAdd` | `Function` | - | Add callback |
| `customCardRenderer` | `Function` | - | Custom card component |
| `customPopoverComponent` | `Function` | - | Custom popover form |
| `theme` | `'light' \| 'dark'` | `'light'` | Color theme |

### StepItem

| Property | Type | Description |
|----------|------|-------------|
| `id?` | `string` | Unique identifier |
| `title` | `string` | Display title |
| `description?` | `string` | Optional description |
| `comment?` | `string` | Optional comment |
| `children?` | `StepItem[]` | Nested items |
| `editable?` | `boolean` | Allow editing |
| `enableAddChild?` | `boolean` | Allow adding children |
| `metadata?` | `Record<string, any>` | Custom data |

## Navigation Modes

### Tree Mode
- **Standard**: Traditional hierarchical tree with connecting lines
- **Organizational**: Horizontal org-chart layout like decision trees

### Breadcrumb Mode  
- **Grid**: Responsive card grid layout
- **List**: Vertical stacked list layout

## Customization

### Custom Card Rendering
```tsx
const customCardRenderer = (item: StepItem, defaultCard: React.ReactNode) => (
  <div style={{ border: '2px solid red' }}>
    {defaultCard}
    <div>Custom content for {item.title}</div>
  </div>
);

<StepNavigator 
  data={data}
  customCardRenderer={customCardRenderer}
/>
```

### Custom Popover Form
```tsx
const CustomForm = ({ data, onChange, onSubmit, onCancel }) => (
  <div>
    <input
      value={data.title}
      onChange={(e) => onChange({ ...data, title: e.target.value })}
    />
    <button onClick={onSubmit}>Save</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
);

<StepNavigator 
  data={data}
  customPopoverComponent={CustomForm}
/>
```

## Styling

The component uses CSS modules to avoid style conflicts. You can:

1. **Override CSS variables** for theming
2. **Add custom classes** via `className` and `cardClassName` props  
3. **Use custom renderers** for complete control

## License

MIT