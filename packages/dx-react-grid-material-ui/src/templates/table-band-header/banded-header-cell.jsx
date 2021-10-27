import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material/styles';
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

export const BandedHeaderCell = ({
  component: HeaderCellComponent, className, beforeBorder, ...restProps
}) => {
  const StyledHeaderCellComponent = styled(HeaderCellComponent)(styles);
  return (
    <StyledHeaderCellComponent
      className={classNames({
        [classes.headerCellBorder]: true,
        [classes.beforeBorder]: beforeBorder,
      }, className)}
      {...restProps}
    />
  );
};

BandedHeaderCell.propTypes = {
  component: PropTypes.func.isRequired,
  className: PropTypes.string,
  beforeBorder: PropTypes.bool,
};

BandedHeaderCell.defaultProps = {
  className: undefined,
  beforeBorder: false,
};
