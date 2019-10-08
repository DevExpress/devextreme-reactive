import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { HOUR_MINUTE_OPTIONS } from '@devexpress/dx-scheduler-core';

const styles = theme => ({
  label: {
    userSelect: 'none',
    border: 0,
    height: theme.spacing(6) + 1,
    lineHeight: `${theme.spacing(6)}px`,
    padding: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'right',
    paddingLeft: theme.spacing(0.25),
    paddingRight: theme.spacing(1),
  },
  text: {
    ...theme.typography.caption,
    whiteSpace: 'nowrap',
  },
  emptyLabel: {
    height: theme.spacing(3),
  },
});

const LabelBase = React.memo(({
  classes,
  className,
  time,
  formatDate,
  ...restProps
}) => (
  <div
    className={classNames({
      [classes.label]: true,
      [classes.emptyLabel]: !time,
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
  className: PropTypes.string,
};

LabelBase.defaultProps = {
  className: undefined,
  time: undefined,
  formatDate: () => undefined,
};

export const Label = withStyles(styles, { name: 'Label' })(LabelBase);
