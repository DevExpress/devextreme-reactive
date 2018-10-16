import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../../utils';

const styles = theme => ({
  emptyCell: {
    borderBottom: getBorder(theme),
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
  },
});

export const DayScaleEmptyCellBase = ({
  classes,
  className,
  ...restProps
}) => <div {...restProps} className={classNames(classes.emptyCell, className)} />;

DayScaleEmptyCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

DayScaleEmptyCellBase.defaultProps = {
  className: undefined,
};

export const DayScaleEmptyCell = withStyles(styles, { name: 'DayScaleEmptyCell' })(DayScaleEmptyCellBase);
