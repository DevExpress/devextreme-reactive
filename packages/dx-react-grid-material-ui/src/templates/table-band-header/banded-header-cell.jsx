import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { getBorderColor } from '.././utils';
import { groupCellHeight } from './cell';

const styles = theme => ({
  headerCellBorder: {
    borderLeft: getBorderColor(theme),
    borderRight: getBorderColor(theme),
    borderTop: 'none',
    '&:first-child': {
      borderLeft: 0,
    },
  },
});

export const BandedHeaderCellBase = ({
  component: Component, className, classes, style, rowSpan, ...restProps
}) => {
  const paddingTop = rowSpan > 1 ? (groupCellHeight * (rowSpan - 1)) : '';
  return (
    <Component
      className={classNames(classes.headerCellBorder, className)}
      style={{
        ...style,
        ...(rowSpan > 1 ? { paddingBottom: 0, paddingTop: `${paddingTop}px` } : null),
      }}
      rowSpan={rowSpan}
      {...restProps}
    />
  );
};

BandedHeaderCellBase.propTypes = {
  component: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  rowSpan: PropTypes.number,
};

BandedHeaderCellBase.defaultProps = {
  className: undefined,
  rowSpan: undefined,
  style: null,
};

export const BandedHeaderCell = withStyles(styles, { name: 'BandedHeaderCell' })(BandedHeaderCellBase);
