import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  headerCellBorder: {
    borderTop: 'none',
    verticalAlign: 'bottom',
    paddingBottom: theme.spacing.unit * 2,
    '&:after': {
      content: '""',
      position: 'absolute',
      background: theme.palette.divider,
      width: 1,
      top: 0,
      bottom: 0,
      right: 0,
    },
    '&:last-child': {
      '&:after': {
        content: 'none',
      },
    },
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
