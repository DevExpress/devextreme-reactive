import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { HOUR_MINUTE_OPTIONS } from '@devexpress/dx-scheduler-core';
import { getBrightBorder } from '../../../utils';

const styles = theme => ({
  label: {
    userSelect: 'none',
    border: 0,
    height: theme.spacing(6),
    lineHeight: `${theme.spacing(6)}px`,
    padding: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'right',
    paddingLeft: theme.spacing(0.25),
    paddingRight: theme.spacing(1),
    // display: 'table-cell',
  },
  text: {
    ...theme.typography.caption,
    fontSize: '0.7rem',
    whiteSpace: 'nowrap',
    color: theme.palette.text.secondary,
  },
  emptyLabel: {
    height: theme.spacing(3),
  },
  brightBottomBorder: {
    borderBottom: getBrightBorder(theme),
    '&:last-child': {
      borderBottom: 'none',
    },
    boxSizing: 'border-box',
  },
});

const LabelBase = React.memo(({
  classes,
  className,
  time,
  formatDate,
  groupingInfo,
  endOfGroup,
  ...restProps
}) => (
  <div
    className={classNames({
      [classes.label]: true,
      [classes.emptyLabel]: !time,
      [classes.brightBottomBorder]: endOfGroup,
    }, className)}
    {...restProps}
  >
    {time && (
      <span className={classes.text}>
        {formatDate(time, HOUR_MINUTE_OPTIONS)}
      </span>
    )}

  </div>
));

LabelBase.propTypes = {
  formatDate: PropTypes.func,
  time: PropTypes.instanceOf(Date),
  classes: PropTypes.object.isRequired,
  groupingInfo: PropTypes.arrayOf(PropTypes.object),
  endOfGroup: PropTypes.bool,
  className: PropTypes.string,
};

LabelBase.defaultProps = {
  className: undefined,
  time: undefined,
  formatDate: () => undefined,
  groupingInfo: undefined,
  endOfGroup: false,
};

export const Label = withStyles(styles, { name: 'Label' })(LabelBase);
