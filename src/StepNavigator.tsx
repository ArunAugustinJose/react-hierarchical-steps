import React, { useState, useCallback } from "react";
import { Plus } from "lucide-react";
import styles from "./StepNavigator.module.css";
import { StepItem, StepNavigatorProps, AddEditFormData } from "./common/types";
import AddEditPopover from "./components/AddEditPopover";
import { TreeNodeStandard } from "./components/TreeNode";
import { TreeNodeOrganizational } from "./components/TreeNode";
import BreadcrumbNavigation from "./components/Breadcrumb";

const StepNavigator: React.FC<StepNavigatorProps> = ({
  data,
  mode = "breadcrumb",
  treeDisplayMode = "standard",
  breadcrumbDisplayMode = "grid",
  showConnectingLines = true,
  enableEdit = false,
  enableAdd = false,
  onEdit,
  onAdd,
  customCardRenderer,
  customPopoverComponent,
  className = "",
  cardClassName = "",
  theme = "light",
}) => {
  const [popoverState, setPopoverState] = useState<{
    isOpen: boolean;
    type: "edit" | "add";
    item: StepItem | null;
    parentItem: StepItem | null;
    path: StepItem[];
  }>({
    isOpen: false,
    type: "add",
    item: null,
    parentItem: null,
    path: [],
  });

  // Auto-generate IDs if missing
  const processData = useCallback(
    (items: StepItem[], prefix = ""): StepItem[] => {
      return items.map((item, index) => ({
        ...item,
        id: item.id || `${prefix}item-${index}`,
        children: item.children
          ? processData(item.children, `${prefix}item-${index}-`)
          : undefined,
      }));
    },
    []
  );

  const processedData = processData(data);

  const handleEditClick = useCallback((item: StepItem, path: StepItem[]) => {
    setPopoverState({
      isOpen: true,
      type: "edit",
      item,
      parentItem: null,
      path,
    });
  }, []);

  const handleAddClick = useCallback(
    (parentItem: StepItem | null, path: StepItem[]) => {
      setPopoverState({
        isOpen: true,
        type: "add",
        item: null,
        parentItem,
        path,
      });
    },
    []
  );

  const handlePopoverClose = useCallback(() => {
    setPopoverState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handlePopoverSubmit = useCallback(
    (data: AddEditFormData) => {
      const { type, item, parentItem, path } = popoverState;

      if (type === "edit" && item && onEdit) {
        onEdit(item, data, path);
      } else if (type === "add" && onAdd) {
        onAdd(parentItem, data, path);
      }
    },
    [popoverState, onEdit, onAdd]
  );

  const getPopoverTitle = () => {
    if (popoverState.type === "edit") {
      return `Edit: ${popoverState.item?.title || "Item"}`;
    }
    return popoverState.parentItem
      ? `Add child to: ${popoverState.parentItem.title}`
      : "Add new root item";
  };

  const getPopoverInitialData = () => {
    if (popoverState.type === "edit" && popoverState.item) {
      return {
        title: popoverState.item.title || "",
        description: popoverState.item.description || "",
        comment: popoverState.item.comment || "",
      };
    }
    return {
      title: "",
      description: "",
      comment: "",
    };
  };

  return (
    <div className={`${styles.stepNavigator} ${styles[theme]} ${className}`}>
      {mode === "tree" ? (
        <div
          className={
            treeDisplayMode === "organizational"
              ? styles.treeOrganizational
              : styles.treeStandard
          }
        >
          {treeDisplayMode === "organizational" ? (
            <TreeNodeOrganizational
              items={processedData}
              level={0}
              path={[]}
              enableEdit={enableEdit}
              enableAdd={enableAdd}
              customCardRenderer={customCardRenderer}
              cardClassName={cardClassName}
              theme={theme}
              onEditClick={handleEditClick}
              onAddClick={handleAddClick}
            />
          ) : (
            <>
              {processedData.map((item, index) => (
                <TreeNodeStandard
                  key={item.id || index}
                  item={item}
                  level={0}
                  path={[]}
                  showConnectingLines={showConnectingLines}
                  enableEdit={enableEdit}
                  enableAdd={enableAdd}
                  customCardRenderer={customCardRenderer}
                  cardClassName={cardClassName}
                  theme={theme}
                  onEditClick={handleEditClick}
                  onAddClick={handleAddClick}
                />
              ))}
            </>
          )}

          {/* Add root level item for tree mode */}
          {enableAdd && onAdd && (
            <button
              className={styles.addButton}
              onClick={() => handleAddClick(null, [])}
            >
              <Plus size={16} />
              Add new root step
            </button>
          )}
        </div>
      ) : (
        <BreadcrumbNavigation
          data={processedData}
          displayMode={breadcrumbDisplayMode}
          enableEdit={enableEdit}
          enableAdd={enableAdd}
          customCardRenderer={customCardRenderer}
          cardClassName={cardClassName}
          theme={theme}
          onEditClick={handleEditClick}
          onAddClick={handleAddClick}
        />
      )}

      {/* Popover for Add/Edit */}
      <AddEditPopover
        isOpen={popoverState.isOpen}
        onClose={handlePopoverClose}
        onSubmit={handlePopoverSubmit}
        initialData={getPopoverInitialData()}
        title={getPopoverTitle()}
        customComponent={customPopoverComponent}
      />
    </div>
  );
};

export default StepNavigator;
