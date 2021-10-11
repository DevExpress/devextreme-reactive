import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';

const styles = {
  emptyCell: {
    height: '100%',
    width: '100%',
  },
};

export const DayScaleEmptyCellBase = ({
  classes,
  className,
  children,
  ...restProps
}) => (
  <div {...restProps} className={classNames(classes.emptyCell, className)}>
    {children}
  </div>
);

DayScaleEmptyCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

DayScaleEmptyCellBase.defaultProps = {
  className: undefined,
  children: undefined,
};

export const DayScaleEmptyCell = withStyles(styles, { name: 'DayScaleEmptyCell' })(DayScaleEmptyCellBase);
