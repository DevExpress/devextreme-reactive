import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Typography from '@mui/material/Typography';
import classNames from 'clsx';
import { MONTH_YEAR_OPTIONS } from '@devexpress/dx-scheduler-core';

const styles = {
  text: {
    userSelect: 'none',
    flex: 1,
    textAlign: 'center',
  },
};

const TextBase = ({
  classes,
  className,
  currentDate,
  formatDate,
  ...restProps
}) => (
  <Typography
    variant="h6"
    className={classNames({
      [classes.text]: true,
    }, className)}
    {...restProps}
  >
    {formatDate(currentDate, MONTH_YEAR_OPTIONS)}
  </Typography>
);

TextBase.propTypes = {
  classes: PropTypes.object.isRequired,
  currentDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  formatDate: PropTypes.func.isRequired,
  className: PropTypes.string,
};

TextBase.defaultProps = {
  className: undefined,
};

export const Text = withStyles(styles, { name: 'Text' })(TextBase);
