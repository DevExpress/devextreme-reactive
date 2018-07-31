import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { getBorderColor } from '../utils';

const styles = theme => ({
  headerCellBorder: {
    borderLeft: getBorderColor(theme),
    borderRight: getBorderColor(theme),
    borderTop: 'none',
    '&:first-child': {
      borderLeft: 0,
    },
    '&:last-child': {
      borderRight: 0,
    },
    verticalAlign: 'bottom',
    paddingBottom: theme.spacing.unit * 2,
  },
});

export const BandedHeaderCellBase = ({
  component: HeaderCellComponent, className, classes, ...restProps
}) => (
  <HeaderCellComponent
    className={classNames(classes.headerCellBorder, className)}
    {...restProps}
  />
);

BandedHeaderCellBase.propTypes = {
  component: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

BandedHeaderCellBase.defaultProps = {
  className: undefined,
};

export const BandedHeaderCell = withStyles(styles, { name: 'BandedHeaderCell' })(BandedHeaderCellBase);
