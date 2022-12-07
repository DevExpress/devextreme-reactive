import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material';
import { getBorder } from '../utils';

const PREFIX = 'BandedHeaderCell';
export const classes = {
  headerCellBorder: `${PREFIX}-headerCellBorder`,
  beforeBorder: `${PREFIX}-beforeBorder`,
};

const styles = ({ theme }) => ({
  [`&.${classes.headerCellBorder}`]: {
    borderRight: getBorder(theme),
    borderTop: 'none',
    '&:last-child': {
      borderRight: 0,
    },
    verticalAlign: 'bottom',
    paddingBottom: theme.spacing(2),
  },
  [`&.${classes.beforeBorder}`]: {
    borderLeft: getBorder(theme),
  },
});

const BandedHeaderCellBase = ({
  component: HeaderCellComponent, className, beforeBorder, ...restProps
}) => (
  <HeaderCellComponent
    className={classNames({
      [classes.headerCellBorder]: true,
      [classes.beforeBorder]: beforeBorder,
    }, className)}
    {...restProps}
  />
);

BandedHeaderCellBase.propTypes = {
  component: PropTypes.func.isRequired,
  className: PropTypes.string,
  beforeBorder: PropTypes.bool,
};

BandedHeaderCellBase.defaultProps = {
  className: undefined,
  beforeBorder: false,
};

export const BandedHeaderCell = styled(BandedHeaderCellBase)(styles);
