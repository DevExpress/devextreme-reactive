import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const PREFIX = 'TableNoDataCell';
export const classes = {
  cell: `${PREFIX}-cell`,
  textContainer: `${PREFIX}-textContainer`,
  text: `${PREFIX}-text`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    padding: theme.spacing(6, 0),
    position: 'static !important',
  },
  [`& .${classes.text}`]: {
    transform: 'translateX(-50%)',
    msTransform: 'translateX(-50%)',
    display: 'inline-block',
  },
  [`& .${classes.textContainer}`]: {
    display: 'inline-block',
    position: 'sticky',
    left: '50%',
  },
}));

export const TableNoDataCell = ({
  style,
  colSpan,
  getMessage,
  className,
  tableRow,
  tableColumn,
  ...restProps
}) => (
  <StyledTableCell
    style={style}
    className={classNames(classes.cell, className)}
    colSpan={colSpan}
    {...restProps}
  >
    <div className={classes.textContainer}>
      <big className={classes.text}>
        {getMessage('noData')}
      </big>
    </div>
  </StyledTableCell>
);

TableNoDataCell.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableNoDataCell.defaultProps = {
  style: null,
  colSpan: 1,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
