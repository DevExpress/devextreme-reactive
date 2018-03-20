import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { getBorderColor } from './utils';

const styles = theme => ({
  bandBorder: {
    borderLeft: getBorderColor(theme),
    borderTop: 'none',
    '&:first-child': {
      borderLeft: 0,
    },
  },
});

export const BandHeaderCellBase = ({
  component: Component, className, classes, style, rowSpan, ...restProps
}) => {
  const paddingTop = rowSpan > 1 ? (48 * (rowSpan - 1)) : '';
  return (
    <Component
      {...restProps}
      className={classNames(classes.bandBorder, className)}
      style={{
        ...style,
        ...(rowSpan > 1 ? { paddingBottom: 0, paddingTop: `${paddingTop}px` } : null),
      }}
      rowSpan={rowSpan}
    />
  );
};

BandHeaderCellBase.propTypes = {
  component: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  rowSpan: PropTypes.number,
};

BandHeaderCellBase.defaultProps = {
  className: undefined,
  rowSpan: undefined,
  style: null,
};

export const BandHeaderCell = withStyles(styles, { name: 'BandHeaderCell' })(BandHeaderCellBase);
