import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
  item: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(13),
  },
});

const TableSummaryItemBase = ({
  children,
  type,
  value,
  getMessage,
  classes,
  className,
  ...restProps
}) => (
  <div
    className={classNames({
      [classes.item]: true,
    }, className)}
    {...restProps}
  >
    {
      <React.Fragment>
        {getMessage(type)}
        :&nbsp;&nbsp;
        {children}
      </React.Fragment>
    }
  </div>
);

TableSummaryItemBase.propTypes = {
  value: PropTypes.number,
  type: PropTypes.string.isRequired,
  getMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

TableSummaryItemBase.defaultProps = {
  value: null,
  children: undefined,
  className: undefined,
};

export const TableSummaryItem = withStyles(styles)(TableSummaryItemBase);
