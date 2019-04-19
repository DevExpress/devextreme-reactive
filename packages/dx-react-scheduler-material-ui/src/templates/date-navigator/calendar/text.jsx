import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import moment from 'moment';

const styles = {
  text: {
    flex: 1,
    textAlign: 'center',
  },
};

const TextBase = ({
  classes,
  className,
  currentDate,
  dateFormat,
  ...restProps
}) => (
  <Typography
    variant="h6"
    className={classNames({
      [classes.text]: true,
    }, className)}
    {...restProps}
  >
    {dateFormat(new Date(currentDate), { month: 'long', year: 'numeric' })}
  </Typography>
);

TextBase.propTypes = {
  classes: PropTypes.object.isRequired,
  currentDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  className: PropTypes.string,
};

TextBase.defaultProps = {
  className: undefined,
};

export const Text = withStyles(styles, { name: 'Text' })(TextBase);
