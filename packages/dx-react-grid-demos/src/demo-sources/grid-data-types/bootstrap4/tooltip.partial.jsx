// BLOCK:imports
import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
// BLOCK:imports

// BLOCK:body
const TooltipFormatter = ({
  row: { phone, birthDate, firstName },
  column: { name: columnName },
  value,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const id = firstName + columnName;

  return (
    <div>
      <span href="#" id={id}>
        {value}
      </span>
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        autohide={false}
        target={`#${id}`}
        toggle={toggle}
      >
        {`phone: ${phone}`}
        <br />
        {`birth date: ${birthDate}`}
      </Tooltip>
    </div>
  );
};
// BLOCK:body
