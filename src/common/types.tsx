export type StepItem = {
  title: string;
  description?: string;
  children?: StepItem[];
  editable?: boolean;
  enableOptionForNewChild?: boolean;
};
