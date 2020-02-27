// BLOCK:imports
import * as React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
// BLOCK:imports

// BLOCK:body
const TooltipFormatter = ({ row: { phone, birthDate }, value }) => (
  <Tooltip title={(
    <span>
      {`phone: ${phone}`}
      <br />
      {`birth date: ${birthDate}`}
    </span>
  )}
  >
    <span>
      {value}
    </span>
  </Tooltip>
);
// BLOCK:body
