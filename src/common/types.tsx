export type StepItem = {
  id?: string;
  title: string;
  description?: string;
  comment?: string;
  children?: StepItem[];
  editable?: boolean;
  enableAddChild?: boolean;
  metadata?: Record<string, any>;
};

export type NavigationMode = "tree" | "breadcrumb";
export type TreeDisplayMode = "standard" | "organizational";
export type BreadcrumbDisplayMode = "list" | "grid";

export type AddEditFormData = {
  title: string;
  description: string;
  comment: string;
};

export type PopoverProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddEditFormData) => void;
  initialData?: Partial<AddEditFormData>;
  title: string;
  customComponent?: React.ComponentType<{
    data: AddEditFormData;
    onChange: (data: AddEditFormData) => void;
    onSubmit: () => void;
    onCancel: () => void;
  }>;
};

export type StepNavigatorProps = {
  data: StepItem[];
  mode?: NavigationMode;
  treeDisplayMode?: TreeDisplayMode;
  breadcrumbDisplayMode?: BreadcrumbDisplayMode;
  showConnectingLines?: boolean;
  enableEdit?: boolean;
  enableAdd?: boolean;
  onEdit?: (item: StepItem, data: AddEditFormData, path: StepItem[]) => void;
  onAdd?: (
    parentItem: StepItem | null,
    data: AddEditFormData,
    path: StepItem[]
  ) => void;
  customCardRenderer?: (
    item: StepItem,
    defaultCard: React.ReactNode
  ) => React.ReactNode;
  customPopoverComponent?: React.ComponentType<{
    data: AddEditFormData;
    onChange: (data: AddEditFormData) => void;
    onSubmit: () => void;
    onCancel: () => void;
  }>;
  className?: string;
  cardClassName?: string;
  theme?: "light" | "dark";
};
