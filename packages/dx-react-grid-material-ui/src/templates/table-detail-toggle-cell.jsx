import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';

const PREFIX = 'TableDetailToggleCell';
export const classes = {
  toggleCell: `${PREFIX}-toggleCell`,
  toggleCellButton: `${PREFIX}-toggleCellButton`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.toggleCell}`]: {
    textAlign: 'center',
    textOverflow: 'initial',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(1),
  },
}));

export const TableDetailToggleCell = ({
  style, expanded, onToggle,
  tableColumn, tableRow, row,
  className, forwardedRef,
  ...restProps
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onToggle();
  };
  return (
    <StyledTableCell
      className={classNames(classes.toggleCell, className)}
      style={style}
      ref={forwardedRef}
      {...restProps}
    >
      <IconButton onClick={handleClick}>
        {
          expanded
            ? <ExpandLess />
            : <ExpandMore />
        }
      </IconButton>
    </StyledTableCell>
  );
};

TableDetailToggleCell.propTypes = {
  style: PropTypes.object,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
  forwardedRef: PropTypes.object,
};

TableDetailToggleCell.defaultProps = {
  style: null,
  expanded: false,
  onToggle: () => {},
  className: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  forwardedRef: undefined,
};
