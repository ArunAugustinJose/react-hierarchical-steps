import React, { useState, useCallback } from "react";
import { Home, ChevronRight, ChevronLeft, Edit3, Plus } from "lucide-react";
import styles from "../../StepNavigator.module.css";
import {
  StepItem,
  BreadcrumbDisplayMode,
  AddEditFormData,
} from "../../common/types";

interface BreadcrumbNavigationProps {
  data: StepItem[];
  displayMode: BreadcrumbDisplayMode;
  enableEdit: boolean;
  enableAdd: boolean;
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
  cardClassName?: string;
  theme: "light" | "dark";
  onEditClick: (item: StepItem, path: StepItem[]) => void;
  onAddClick: (parentItem: StepItem | null, path: StepItem[]) => void;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  data,
  displayMode,
  enableEdit,
  enableAdd,
  customCardRenderer,
  cardClassName,
  theme,
  onEditClick,
  onAddClick,
}) => {
  const [path, setPath] = useState<StepItem[]>([]);
  const [currentItems, setCurrentItems] = useState<StepItem[]>(data);

  const handleItemClick = useCallback(
    (item: StepItem) => {
      if (item.children && item.children.length > 0) {
        setPath([...path, item]);
        setCurrentItems(item.children);
      }
    },
    [path]
  );

  const handleBreadcrumbClick = useCallback(
    (index: number) => {
      if (index === -1) {
        setPath([]);
        setCurrentItems(data);
      } else {
        const newPath = path.slice(0, index + 1);
        const newCurrentItems = newPath[newPath.length - 1]?.children || data;
        setPath(newPath);
        setCurrentItems(newCurrentItems);
      }
    },
    [path, data]
  );

  const currentParent = path[path.length - 1] || null;

  const renderCard = (item: StepItem, index: number) => {
    const hasChildren = item.children && item.children.length > 0;
    const itemPath = [...path, item];

    const defaultCard = (
      <div
        className={`${styles.card} ${styles[theme]} ${cardClassName || ""}`}
        onClick={() => handleItemClick(item)}
        style={{
          cursor: hasChildren ? "pointer" : "default",
          position: "relative",
        }}
      >
        <div style={{ paddingRight: "60px" }}>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          {item.description && (
            <p className={styles.cardDescription}>{item.description}</p>
          )}
          {item.comment && <p className={styles.cardComment}>{item.comment}</p>}
          {hasChildren && (
            <p
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                margin: "8px 0 0 0",
              }}
            >
              {item.children!.length} sub-steps →
            </p>
          )}
        </div>

        <div className={styles.cardActions}>
          {enableEdit && item.editable && (
            <button
              className={`${styles.button} ${styles.actionButton}`}
              onClick={(e) => {
                e.stopPropagation();
                onEditClick(item, itemPath);
              }}
              title="Edit"
            >
              <Edit3 size={14} />
            </button>
          )}
        </div>

        {hasChildren && (
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
            }}
          >
            <ChevronRight size={16} style={{ opacity: 0.5 }} />
          </div>
        )}
      </div>
    );

    return customCardRenderer
      ? customCardRenderer(item, defaultCard)
      : defaultCard;
  };

  return (
    <div className={styles[theme]}>
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumbNav}>
        <button
          className={styles.breadcrumbItem}
          onClick={() => handleBreadcrumbClick(-1)}
        >
          <Home size={16} />
          Home
        </button>

        {path.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight size={14} className={styles.breadcrumbSeparator} />
            <button
              className={styles.breadcrumbItem}
              onClick={() => handleBreadcrumbClick(index)}
            >
              {item.title}
            </button>
          </React.Fragment>
        ))}

        {path.length > 0 && (
          <button
            className={styles.backButton}
            onClick={() => handleBreadcrumbClick(path.length - 2)}
          >
            <ChevronLeft size={14} />
            Back
          </button>
        )}
      </nav>

      {/* Current Level Items */}
      <div
        className={
          displayMode === "grid" ? styles.breadcrumbGrid : styles.breadcrumbList
        }
      >
        {currentItems.map((item, index) => (
          <div key={item.id || index}>{renderCard(item, index)}</div>
        ))}
      </div>

      {/* Add New Item Button */}
      {enableAdd && currentParent?.enableAddChild !== false && (
        <button
          className={styles.addButton}
          onClick={() => onAddClick(currentParent, path)}
        >
          <Plus size={16} />
          Add new step at this level
        </button>
      )}
    </div>
  );
};

export default BreadcrumbNavigation;
