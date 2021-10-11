import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';
import { HOUR_MINUTE_OPTIONS } from '@devexpress/dx-scheduler-core';
import { SPACING_LABEL_HEIGHT } from '../../../constants';

const styles = theme => ({
  label: {
    userSelect: 'none',
    border: 0,
    height: theme.spacing(SPACING_LABEL_HEIGHT),
    lineHeight: theme.spacing(SPACING_LABEL_HEIGHT),
    padding: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'right',
    paddingLeft: theme.spacing(0.25),
    paddingRight: theme.spacing(1),
  },
  text: {
    ...theme.typography.caption,
    fontSize: '0.7rem',
    whiteSpace: 'nowrap',
    color: theme.palette.text.secondary,
  },
  emptyLabel: {
    height: theme.spacing(SPACING_LABEL_HEIGHT / 2),
    '&:last-child': {
      height: `calc(${theme.spacing(SPACING_LABEL_HEIGHT / 2)} - 1px)`,
    },
  },
});

const LabelBase = ({
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
    }, className)}
    {...restProps}
  >
    {time && (
      <span className={classes.text}>
        {formatDate(time, HOUR_MINUTE_OPTIONS)}
      </span>
    )}

  </div>
);

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
