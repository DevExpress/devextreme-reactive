// BLOCK:imports
import React, { useState, useRef } from 'react';
import { Tooltip } from 'reactstrap';
// BLOCK:imports

// BLOCK:body
const TooltipFormatter = ({
  row: { phone, birthDate },
  value,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const spanRef = useRef(null);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <span ref={spanRef}>
        {value}
      </span>
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        autohide={false}
        target={spanRef}
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
