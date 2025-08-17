import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { StepItem } from "./common/types";
import Breadcrumbs from "./components/Breadcrumb";
import Accordion from "./components/Accordion";

type StepNavigatorProps = {
  data: StepItem[];
  title: string;
};

const StepNavigator: React.FC<StepNavigatorProps> = ({ data, title }) => {
  const [path, setPath] = useState<StepItem[]>([]);
  const [currentItems, setCurrentItems] = useState<StepItem[]>(data);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StepItem | null>(null);
  const [suggestion, setSuggestion] = useState("");

  const handleItemClick = (item: StepItem) => {
    if (item.children) {
      setPath([...path, item]);
      setCurrentItems(item.children);
    }
  };

  const handleBreadcrumbClick = (data: StepItem[]) => {
    setCurrentItems(data);
  };

  const handleEditClick = (item: StepItem) => {
    setEditingItem(item);
    setSuggestion("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = () => {
    console.log("Submitted suggestion for:", editingItem);
    console.log("Suggestion:", suggestion);
    setOpen(false);
  };

  console.log(path, "111111111111path");
  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h6">{title}</Typography>

      <Breadcrumbs
        data={data}
        handleClick={handleBreadcrumbClick}
        path={path}
        setPath={setPath}
      />

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {currentItems.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 12,
              width: "15rem",
              maxWidth: "15rem",
              height: "fit-content",
              position: "relative",
              display: "grid",
              gap: 16,
            }}
          >
            <div
              style={{
                cursor: item.children?.length ? "pointer" : "default",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() => handleItemClick(item)}
            >
              <Typography variant="body1">{item.title}</Typography>

              {item.editable && (
                <IconButton size="small" onClick={() => handleEditClick(item)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
            </div>
            <Accordion details={item} handleExplore={handleItemClick} />
          </div>
        ))}
        {path?.length > 0 &&
          path[path?.length - 1]?.enableOptionForNewChild && (
            <IconButton
              size="large"
              onClick={() => handleEditClick(path[path?.length - 1])}
              style={{
                border: "1px solid #ccc",
                borderRadius: 50,
                height: "fit-content",
              }}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          )}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Submit Suggestion</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>{editingItem?.title}</Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Your suggestion"
            fullWidth
            multiline
            rows={4}
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StepNavigator;
