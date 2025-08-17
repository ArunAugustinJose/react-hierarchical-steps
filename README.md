# React Hierarchical Steps

A React + TypeScript component to display a navigable hierarchical structure using breadcrumbs and Material UI.

## Features

- Supports infinite nesting
- Breadcrumb navigation
- Conditional edit icon + modal form
- Material UI styled

## Install

```bash
npm install react-hierarchical-steps
```

## Usage

```tsx
import StepNavigator, { StepItem } from 'react-hierarchical-steps';

const data: StepItem[] = [
  {
    title: 'Remote not working',
    editable: true
  },
  {
    title: 'Line on the screen',
    editable: false
  },
  {
    title: 'WiFi not connecting',
    editable: true,
    children: [
      { title: 'Check router', editable: true },
      { title: 'Restart TV', editable: false }
    ]
  }
];

<StepNavigator data={data} />;
```

## License

MIT
