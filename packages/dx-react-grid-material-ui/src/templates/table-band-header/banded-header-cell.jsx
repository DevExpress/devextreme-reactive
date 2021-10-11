import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';
import { getBorder } from '../utils';

const styles = theme => ({
  headerCellBorder: {
    borderRight: getBorder(theme),
    borderTop: 'none',
    '&:last-child': {
      borderRight: 0,
    },
    verticalAlign: 'bottom',
    paddingBottom: theme.spacing(2),
  },
  beforeBorder: {
    borderLeft: getBorder(theme),
  },
});

export const BandedHeaderCellBase = ({
  component: HeaderCellComponent, className, classes, beforeBorder, ...restProps
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
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  beforeBorder: PropTypes.bool,
};

BandedHeaderCellBase.defaultProps = {
  className: undefined,
  beforeBorder: false,
};

export const BandedHeaderCell = withStyles(styles, { name: 'BandedHeaderCell' })(BandedHeaderCellBase);
