import React, { useState } from "react";
import StepNavigator from "./StepNavigator";
import {
  StepItem,
  NavigationMode,
  TreeDisplayMode,
  BreadcrumbDisplayMode,
  AddEditFormData,
} from "./common/types";
import styles from "./StepNavigator.module.css";

const Demo = () => {
  const [demoData, setDemoData] = useState<StepItem[]>([
    {
      id: "1",
      title: "Remote Control Issues",
      description: "Troubleshoot remote control problems",
      comment: "Most common issue reported by users",
      editable: true,
      enableAddChild: true,
    },
    {
      id: "2",
      title: "WiFi Connection Problems",
      description: "Wifi connectivity issues and solutions",
      comment: "Check these steps in order",
      editable: true,
      enableAddChild: true,
      children: [
        {
          id: "2-1",
          title: "Check Router Status",
          description: "Verify router lights and connections",
          editable: true,
          enableAddChild: true,
        },
        {
          id: "2-2",
          title: "Restart Network Device",
          description: "Power cycle the device",
          editable: true,
          enableAddChild: true,
          children: [
            {
              id: "2-2-1",
              title: "Unplug Power Cable",
              description: "Wait 30 seconds before reconnecting",
              comment: "Complete power disconnect required",
              editable: true,
            },
            {
              id: "2-2-2",
              title: "Check Network Settings",
              description: "Verify network configuration",
              editable: true,
            },
          ],
        },
        {
          id: "2-3",
          title: "Reset Network Settings",
          description: "Factory reset if other steps fail",
          comment: "Last resort option",
          editable: true,
        },
      ],
    },
    {
      id: "3",
      title: "Audio/Video Issues",
      description: "Sound and picture quality problems",
      editable: true,
      enableAddChild: true,
      children: [
        {
          id: "3-1",
          title: "Check Audio Settings",
          description: "Verify volume and audio output",
          editable: true,
        },
        {
          id: "3-2",
          title: "Test Video Quality",
          description: "Check resolution and display settings",
          editable: true,
        },
      ],
    },
    {
      id: "4",
      title: "Hardware Problems",
      description: "Physical device issues",
      editable: true,
      enableAddChild: true,
      children: [
        {
          id: "4-1",
          title: "Inspect Cables",
          description: "Check all physical connections",
          editable: true,
        },
        {
          id: "4-2",
          title: "Check Power Supply",
          description: "Verify power adapter functionality",
          editable: true,
        },
      ],
    },
  ]);

  const [mode, setMode] = useState<NavigationMode>("breadcrumb");
  const [treeDisplayMode, setTreeDisplayMode] =
    useState<TreeDisplayMode>("standard");
  const [breadcrumbDisplayMode, setBreadcrumbDisplayMode] =
    useState<BreadcrumbDisplayMode>("grid");
  const [showLines, setShowLines] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleEdit = (
    item: StepItem,
    data: AddEditFormData,
    path: StepItem[]
  ) => {
    console.log("Edit item:", item);
    console.log("New data:", data);
    console.log("Path:", path.map((p) => p.title).join(" > "));

    // In a real app, you would update your data here
    alert(`Edited "${item.title}" with new title: "${data.title}"`);
  };

  const handleAdd = (
    parentItem: StepItem | null,
    data: AddEditFormData,
    path: StepItem[]
  ) => {
    console.log("Add to parent:", parentItem);
    console.log("New data:", data);
    console.log("Path:", path.map((p) => p.title).join(" > "));

    const pathStr = parentItem
      ? path.map((p) => p.title).join(" > ") + " > " + parentItem.title
      : "Root";
    alert(`Added "${data.title}" to: ${pathStr}`);
  };

  // Custom form component example
  const CustomForm: React.FC<{
    data: AddEditFormData;
    onChange: (data: AddEditFormData) => void;
    onSubmit: () => void;
    onCancel: () => void;
  }> = ({ data, onChange, onSubmit, onCancel }) => (
    <div
      style={{
        background: "var(--bg-secondary)",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      <h4 style={{ margin: "0 0 16px 0", color: "var(--accent-color)" }}>
        Custom Form Component
      </h4>

      <div style={{ marginBottom: "12px" }}>
        <input
          type="text"
          className={styles.formInput}
          placeholder="Custom Title Input"
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          style={{ borderColor: "var(--accent-color)" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <textarea
          className={`${styles.formInput} ${styles.formTextarea}`}
          placeholder="Custom Description"
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
        />
      </div>

      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <button
          className={`${styles.formButton} ${styles.formButtonCancel}`}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className={`${styles.formButton} ${styles.formButtonSubmit}`}
          onClick={onSubmit}
          disabled={!data.title.trim()}
        >
          Save
        </button>
      </div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: theme === "dark" ? "#0f172a" : "#f8fafc",
        transition: "background-color 0.2s ease",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Controls */}
        <div
          style={{
            background: theme === "dark" ? "#1e293b" : "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            marginBottom: "24px",
            border: "1px solid",
            borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            style={{
              margin: "0 0 20px 0",
              color: theme === "dark" ? "#f1f5f9" : "#1a202c",
              fontSize: "28px",
              fontWeight: "700",
            }}
          >
            React Hierarchical Steps Library
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            {/* Navigation Mode */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme === "dark" ? "#cbd5e0" : "#4a5568",
                }}
              >
                Navigation Mode:
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => setMode("breadcrumb")}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "1px solid",
                    borderColor: theme === "dark" ? "#4a5568" : "#e2e8f0",
                    background:
                      mode === "breadcrumb"
                        ? "#3182ce"
                        : theme === "dark"
                        ? "#2d3748"
                        : "#ffffff",
                    color:
                      mode === "breadcrumb"
                        ? "#ffffff"
                        : theme === "dark"
                        ? "#cbd5e0"
                        : "#4a5568",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  Breadcrumb
                </button>
                <button
                  onClick={() => setMode("tree")}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "1px solid",
                    borderColor: theme === "dark" ? "#4a5568" : "#e2e8f0",
                    background:
                      mode === "tree"
                        ? "#3182ce"
                        : theme === "dark"
                        ? "#2d3748"
                        : "#ffffff",
                    color:
                      mode === "tree"
                        ? "#ffffff"
                        : theme === "dark"
                        ? "#cbd5e0"
                        : "#4a5568",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  Tree
                </button>
              </div>
            </div>

            {/* Tree Display Mode */}
            {mode === "tree" && (
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme === "dark" ? "#cbd5e0" : "#4a5568",
                  }}
                >
                  Tree Style:
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => setTreeDisplayMode("standard")}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid",
                      borderColor: theme === "dark" ? "#4a5568" : "#e2e8f0",
                      background:
                        treeDisplayMode === "standard"
                          ? "#10b981"
                          : theme === "dark"
                          ? "#2d3748"
                          : "#ffffff",
                      color:
                        treeDisplayMode === "standard"
                          ? "#ffffff"
                          : theme === "dark"
                          ? "#cbd5e0"
                          : "#4a5568",
                      cursor: "pointer",
                      fontSize: "12px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setTreeDisplayMode("organizational")}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid",
                      borderColor: theme === "dark" ? "#4a5568" : "#e2e8f0",
                      background:
                        treeDisplayMode === "organizational"
                          ? "#10b981"
                          : theme === "dark"
                          ? "#2d3748"
                          : "#ffffff",
                      color:
                        treeDisplayMode === "organizational"
                          ? "#ffffff"
                          : theme === "dark"
                          ? "#cbd5e0"
                          : "#4a5568",
                      cursor: "pointer",
                      fontSize: "12px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Organizational
                  </button>
                </div>
              </div>
            )}

            {/* Breadcrumb Display Mode */}
            {mode === "breadcrumb" && (
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme === "dark" ? "#cbd5e0" : "#4a5568",
                  }}
                >
                  Layout:
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => setBreadcrumbDisplayMode("grid")}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid",
                      borderColor: theme === "dark" ? "#4a5568" : "#e2e8f0",
                      background:
                        breadcrumbDisplayMode === "grid"
                          ? "#8b5cf6"
                          : theme === "dark"
                          ? "#2d3748"
                          : "#ffffff",
                      color:
                        breadcrumbDisplayMode === "grid"
                          ? "#ffffff"
                          : theme === "dark"
                          ? "#cbd5e0"
                          : "#4a5568",
                      cursor: "pointer",
                      fontSize: "12px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setBreadcrumbDisplayMode("list")}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid",
                      borderColor: theme === "dark" ? "#4a5568" : "#e2e8f0",
                      background:
                        breadcrumbDisplayMode === "list"
                          ? "#8b5cf6"
                          : theme === "dark"
                          ? "#2d3748"
                          : "#ffffff",
                      color:
                        breadcrumbDisplayMode === "list"
                          ? "#ffffff"
                          : theme === "dark"
                          ? "#cbd5e0"
                          : "#4a5568",
                      cursor: "pointer",
                      fontSize: "12px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    List
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Additional Options */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              alignItems: "center",
            }}
          >
            {mode === "tree" && treeDisplayMode === "standard" && (
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: theme === "dark" ? "#cbd5e0" : "#4a5568",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={showLines}
                  onChange={(e) => setShowLines(e.target.checked)}
                  style={{ cursor: "pointer" }}
                />
                Show connecting lines
              </label>
            )}

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: theme === "dark" ? "#cbd5e0" : "#4a5568",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
                style={{ cursor: "pointer" }}
              />
              Dark theme
            </label>
          </div>
        </div>

        {/* Step Navigator */}
        <StepNavigator
          data={demoData}
          mode={mode}
          treeDisplayMode={treeDisplayMode}
          breadcrumbDisplayMode={breadcrumbDisplayMode}
          showConnectingLines={showLines}
          enableEdit={true}
          enableAdd={true}
          onEdit={handleEdit}
          onAdd={handleAdd}
          theme={theme}
          // customPopoverComponent={CustomForm} // Uncomment to test custom form
        />
      </div>
    </div>
  );
};

export default Demo;
