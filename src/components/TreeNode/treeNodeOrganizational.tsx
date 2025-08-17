import React, { useState } from "react";
import { Edit3, Plus, ChevronDown, ChevronUp } from "lucide-react";
import styles from "../../StepNavigator.module.css";
import { StepItem, AddEditFormData } from "../../common/types";

interface TreeNodeOrganizationalProps {
  items: StepItem[];
  level: number;
  path: StepItem[];
  enableEdit: boolean;
  enableAdd: boolean;
  customCardRenderer?: (
    item: StepItem,
    defaultCard: React.ReactNode
  ) => React.ReactNode;
  cardClassName?: string;
  theme: "light" | "dark";
  onEditClick: (item: StepItem, path: StepItem[]) => void;
  onAddClick: (parentItem: StepItem, path: StepItem[]) => void;
}

const TreeNodeOrganizational: React.FC<TreeNodeOrganizationalProps> = ({
  items,
  level,
  path,
  enableEdit,
  enableAdd,
  customCardRenderer,
  cardClassName,
  theme,
  onEditClick,
  onAddClick,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(
      items.filter((item) => level === 0).map((item) => item.id || item.title)
    )
  );

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const renderCard = (
    item: StepItem,
    itemPath: StepItem[],
    index: number,
    totalItems: number
  ) => {
    const hasChildren = item.children && item.children.length > 0;
    const itemId = item.id || item.title;
    const isExpanded = expandedItems.has(itemId);

    const defaultCard = (
      <div
        className={`${styles.card} ${styles[theme]} ${styles.orgCard} ${
          cardClassName || ""
        }`}
      >
        <div>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          {item.description && (
            <p className={styles.cardDescription}>{item.description}</p>
          )}
          {item.comment && <p className={styles.cardComment}>{item.comment}</p>}

          {hasChildren && (
            <button
              className={styles.button}
              onClick={() => toggleExpanded(itemId)}
              style={{
                marginTop: "12px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                fontSize: "12px",
              }}
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={14} />
                  Hide
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  Show ({item.children!.length})
                </>
              )}
            </button>
          )}
        </div>

        <div className={styles.cardActions}>
          {enableEdit && item.editable && (
            <button
              className={`${styles.button} ${styles.actionButton}`}
              onClick={() => onEditClick(item, itemPath)}
              title="Edit"
            >
              <Edit3 size={14} />
            </button>
          )}
          {enableAdd && item.enableAddChild && (
            <button
              className={`${styles.button} ${styles.actionButton}`}
              onClick={() => onAddClick(item, itemPath)}
              title="Add Child"
            >
              <Plus size={14} />
            </button>
          )}
        </div>
      </div>
    );

    return customCardRenderer
      ? customCardRenderer(item, defaultCard)
      : defaultCard;
  };

  const buildOrgLevels = (
    items: StepItem[],
    currentPath: StepItem[] = []
  ): StepItem[][] => {
    const levels: StepItem[][] = [];

    // Add current level items
    levels.push(items);

    // Collect all expanded children for next level
    const nextLevelItems: StepItem[] = [];
    items.forEach((item) => {
      const itemId = item.id || item.title;
      if (
        expandedItems.has(itemId) &&
        item.children &&
        item.children.length > 0
      ) {
        nextLevelItems.push(...item.children);
      }
    });

    // Recursively build remaining levels
    if (nextLevelItems.length > 0) {
      const childLevels = buildOrgLevels(nextLevelItems, [...currentPath]);
      levels.push(...childLevels);
    }

    return levels;
  };

  const orgLevels = buildOrgLevels(items);

  const calculateHorizontalLine = (
    levelItems: StepItem[],
    levelIndex: number
  ) => {
    if (levelItems.length <= 1) return null;

    // Calculate line position based on first and last items
    const firstIndex = 0;
    const lastIndex = levelItems.length - 1;

    // Position calculation (approximate)
    const itemWidth = 220; // orgCard width + margin
    const totalWidth = levelItems.length * itemWidth;
    const startOffset = firstIndex * itemWidth + itemWidth / 2;
    const endOffset = lastIndex * itemWidth + itemWidth / 2;

    return {
      left: `calc(50% - ${totalWidth / 2}px + ${startOffset}px)`,
      width: `${endOffset - startOffset}px`,
    };
  };

  return (
    <div className={styles.orgTreeContainer}>
      {orgLevels.map((levelItems, levelIndex) => (
        <div key={levelIndex} className={styles.orgLevel}>
          {/* Horizontal connecting line for siblings */}
          {levelIndex > 0 &&
            levelItems.length > 1 &&
            (() => {
              const lineStyle = calculateHorizontalLine(levelItems, levelIndex);
              return lineStyle ? (
                <div className={styles.orgHorizontalLine} style={lineStyle} />
              ) : null;
            })()}

          {levelItems.map((item, itemIndex) => {
            const itemPath = [...path, item];
            const hasChildren = item.children && item.children.length > 0;
            const itemId = item.id || item.title;
            const isExpanded = expandedItems.has(itemId);
            const showVerticalLine = levelIndex > 0;

            return (
              <div
                key={item.id || `${levelIndex}-${itemIndex}`}
                className={styles.orgNodeWrapper}
              >
                {/* Vertical line from parent */}
                {showVerticalLine && <div className={styles.orgVerticalLine} />}

                {/* Connection dot */}
                {showVerticalLine && (
                  <div className={styles.orgConnectionDot} />
                )}

                {/* Card */}
                {renderCard(item, itemPath, itemIndex, levelItems.length)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TreeNodeOrganizational;
