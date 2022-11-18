import * as React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '../table-cell';

export const SummaryCell = ({ onToggle, ...restProps }) => (
  <TableCell
    {...restProps}
    onClick={onToggle}
  />
);

SummaryCell.propTypes = {
  onToggle: PropTypes.func,
};

SummaryCell.defaultProps = {
  onToggle: () => {},
};
