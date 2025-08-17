import React, { useState } from "react";
import { ChevronDown, ChevronRight, Edit3, Plus } from "lucide-react";
import styles from "../../StepNavigator.module.css";
import { StepItem, AddEditFormData } from "../../common/types";

interface TreeNodeStandardProps {
  item: StepItem;
  level: number;
  path: StepItem[];
  showConnectingLines: boolean;
  enableEdit: boolean;
  enableAdd: boolean;
  onEdit?: (item: StepItem, data: AddEditFormData, path: StepItem[]) => void;
  onAdd?: (
    parentItem: StepItem,
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
  onAddClick: (parentItem: StepItem, path: StepItem[]) => void;
}

const TreeNodeStandard: React.FC<TreeNodeStandardProps> = ({
  item,
  level,
  path,
  showConnectingLines,
  enableEdit,
  enableAdd,
  customCardRenderer,
  cardClassName,
  theme,
  onEditClick,
  onAddClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const hasChildren = item.children && item.children.length > 0;
  const currentPath = [...path, item];

  const defaultCard = (
    <div className={`${styles.card} ${styles[theme]} ${cardClassName || ""}`}>
      {/* Connecting Lines */}
      {showConnectingLines && level > 0 && (
        <>
          <div
            className={`${styles.connectingLine} ${styles.connectingLineVertical}`}
          />
          <div
            className={`${styles.connectingLine} ${styles.connectingLineHorizontal}`}
          />
        </>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            flex: 1,
          }}
        >
          {hasChildren && (
            <button
              className={styles.button}
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ marginTop: "2px", width: "32px", height: "32px" }}
            >
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
          )}

          <div style={{ flex: 1 }}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            {item.description && (
              <p className={styles.cardDescription}>{item.description}</p>
            )}
            {item.comment && (
              <p className={styles.cardComment}>{item.comment}</p>
            )}
          </div>
        </div>

        <div className={styles.cardActions}>
          {enableEdit && item.editable && (
            <button
              className={`${styles.button} ${styles.actionButton}`}
              onClick={() => onEditClick(item, currentPath)}
              title="Edit"
            >
              <Edit3 size={14} />
            </button>
          )}
          {enableAdd && item.enableAddChild && (
            <button
              className={`${styles.button} ${styles.actionButton}`}
              onClick={() => onAddClick(item, currentPath)}
              title="Add Child"
            >
              <Plus size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderedCard = customCardRenderer
    ? customCardRenderer(item, defaultCard)
    : defaultCard;

  return (
    <div className={styles.treeNode}>
      {renderedCard}

      {hasChildren && isExpanded && (
        <div>
          {item.children!.map((child, index) => (
            <TreeNodeStandard
              key={child.id || `${item.id || "item"}-${index}`}
              item={child}
              level={level + 1}
              path={currentPath}
              showConnectingLines={showConnectingLines}
              enableEdit={enableEdit}
              enableAdd={enableAdd}
              customCardRenderer={customCardRenderer}
              cardClassName={cardClassName}
              theme={theme}
              onEditClick={onEditClick}
              onAddClick={onAddClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNodeStandard;
