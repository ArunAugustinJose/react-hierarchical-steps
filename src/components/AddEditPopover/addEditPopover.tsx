import React, { useState, useEffect } from "react";
import styles from "../../StepNavigator.module.css";
import { PopoverProps, AddEditFormData } from "../../common/types";

const DefaultPopoverForm: React.FC<{
  data: AddEditFormData;
  onChange: (data: AddEditFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
}> = ({ data, onChange, onSubmit, onCancel }) => {
  return (
    <>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="title">
          Title *
        </label>
        <input
          id="title"
          type="text"
          className={styles.formInput}
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          placeholder="Enter step title"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className={`${styles.formInput} ${styles.formTextarea}`}
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="Enter step description (optional)"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="comment">
          Comment
        </label>
        <textarea
          id="comment"
          className={`${styles.formInput} ${styles.formTextarea}`}
          value={data.comment}
          onChange={(e) => onChange({ ...data, comment: e.target.value })}
          placeholder="Add any additional comments (optional)"
        />
      </div>

      <div className={styles.formActions}>
        <button
          type="button"
          className={`${styles.formButton} ${styles.formButtonCancel}`}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`${styles.formButton} ${styles.formButtonSubmit}`}
          onClick={onSubmit}
          disabled={!data.title.trim()}
        >
          Submit
        </button>
      </div>
    </>
  );
};

const AddEditPopover: React.FC<PopoverProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  title,
  customComponent: CustomComponent,
}) => {
  const [formData, setFormData] = useState<AddEditFormData>({
    title: "",
    description: "",
    comment: "",
    ...initialData,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: "",
        description: "",
        comment: "",
        ...initialData,
      });
    }
  }, [isOpen, initialData]);

  const handleSubmit = () => {
    if (formData.title.trim()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.popoverOverlay} onClick={handleOverlayClick}>
      <div className={styles.popoverContent}>
        <h3 className={styles.popoverTitle}>{title}</h3>

        {CustomComponent ? (
          <CustomComponent
            data={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <DefaultPopoverForm
            data={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default AddEditPopover;
