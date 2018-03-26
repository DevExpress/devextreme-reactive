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

export const HeaderCellBase = ({
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

HeaderCellBase.propTypes = {
  component: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  rowSpan: PropTypes.number,
};

HeaderCellBase.defaultProps = {
  className: undefined,
  rowSpan: undefined,
  style: null,
};

export const HeaderCell = withStyles(styles, { name: 'HeaderCell' })(HeaderCellBase);
