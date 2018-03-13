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
      borderLeft: 'none',
    },
  },
});

export const BandHeaderCellBase = ({
  component: Component,
  className, classes,
  ...restProps
}) => (
  <Component {...restProps} className={classNames(classes.bandBorder, className)} />
);

BandHeaderCellBase.propTypes = {
  component: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

BandHeaderCellBase.defaultProps = {
  className: undefined,
};

export const BandHeaderCell = withStyles(styles, { name: 'BandHeaderCell' })(BandHeaderCellBase);
