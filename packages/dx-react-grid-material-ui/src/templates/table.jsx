import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableMUI from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import { getBorder } from './utils';

const PREFIX = 'Table';
export const classes = {
  table: `${PREFIX}-table`,
  stickyTable: `${PREFIX}-stickyTable`,
  headTable: `${PREFIX}-headTable`,
  footTable: `${PREFIX}-footTable`,
};

const StyledTableMUI = styled(TableMUI)(({ theme }) => ({
  [`&.${classes.table}`]: {
    tableLayout: 'fixed',
    borderCollapse: 'separate',
  },
  [`&.${classes.stickyTable}`]: {
    position: 'sticky',
    zIndex: 500,
    overflow: 'visible',
    background: theme.palette.background.paper,
    fallbacks: {
      position: '-webkit-sticky',
    },
  },
  [`&.${classes.headTable}`]: {
    top: 0,
  },
  [`&.${classes.footTable}`]: {
    borderTop: getBorder(theme),
    bottom: 0,
  },
}));

export const Table = ({
  children, className, use, forwardedRef,
  ...restProps
}) => (
  <StyledTableMUI
    ref={forwardedRef}
    className={classNames({
      [classes.table]: true,
      [classes.stickyTable]: !!use,
      [classes.headTable]: use === 'head',
      [classes.footTable]: use === 'foot',
    }, className)}
    {...restProps}
  >
    {children}
  </StyledTableMUI>
);

Table.propTypes = {
  use: PropTypes.oneOf(['head', 'foot']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Table.defaultProps = {
  use: undefined,
  className: undefined,
  forwardedRef: undefined,
};
