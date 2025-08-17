import React, { useState } from "react";
import { Breadcrumbs as Breadcrumb, Typography } from "@mui/material";

import { StepItem } from "../../common/types";

type BreadcrumbsProps = {
  data: StepItem[];
  handleClick: (data: StepItem[]) => void;
  path: StepItem[];
  setPath: (data: StepItem[] | []) => void;
};

const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { data, path, handleClick, setPath } = props;

  const handleClickHome = () => {
    setPath([]);
    handleClick(data);
  };

  const handleBreadcrumbClick = (index: number) => {
    const newPath = path.slice(0, index + 1);
    const newCurrentItems = newPath[newPath.length - 1]?.children || data;
    setPath(newPath);
    handleClick(newCurrentItems);
  };

  return (
    <>
      <Breadcrumb aria-label="breadcrumb" style={{ margin: "16px 0" }}>
        <Typography style={{ cursor: "pointer" }} onClick={handleClickHome}>
          Home
        </Typography>
        {path.map((p, index) => (
          <Typography
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => handleBreadcrumbClick(index)}
          >
            {p.title}
          </Typography>
        ))}
      </Breadcrumb>
    </>
  );
};

export default Breadcrumbs;
