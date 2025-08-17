import React, { useState } from "react";
// import MUIAccordion from "@mui/material/Accordion";
// import AccordionActions from "@mui/material/AccordionActions";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Button from "@mui/material/Button";
import { StepItem } from "../../common/types";

type AccordionProps = {
  details: StepItem;
  handleExplore: (data: StepItem) => void;
};
const Accordion = ({ details, handleExplore }: AccordionProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded((prev) => !prev); // toggle the accordion
  };

  return (
    <div>
      {/* <MUIAccordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">Information</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ fontSize: 10, display: "grid", gap: 8 }}>
          <span>{details?.description}</span>
          {details.children?.length && (
            <ul>
              {details.children?.map((child) => (
                <li>{child.title}</li>
              ))}
            </ul>
          )}
        </AccordionDetails>
        {details?.children?.length && (
          <AccordionActions>
            <Button
              onClick={() => {
                handleChange();
                handleExplore(details);
              }}
              style={{ fontSize: "small" }}
            >
              Explore
            </Button>
          </AccordionActions>
        )}
      </MUIAccordion> */}
    </div>
  );
};

export default Accordion;
