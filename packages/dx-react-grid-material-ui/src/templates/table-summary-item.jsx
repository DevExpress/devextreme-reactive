import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  item: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(13),
    margin: `${theme.spacing.unit}px 0`,
  },
});

const TableSummaryItemBase = ({
  children, classes, className, ...restProps
}) => (
  <div
    className={classNames({
      [classes.item]: true,
    }, className)}
    {...restProps}
  >
    {children}
  </div>
);

TableSummaryItemBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

TableSummaryItemBase.defaultProps = {
  children: undefined,
  className: undefined,
};

export const TableSummaryItem = withStyles(styles)(TableSummaryItemBase);
