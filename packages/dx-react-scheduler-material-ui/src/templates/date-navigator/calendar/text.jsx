import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

const monthYear = { month: 'long', year: 'numeric' };

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
    {formatDate(new Date(currentDate), monthYear)}
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
  formatDate: PropTypes.func,
};

TextBase.defaultProps = {
  formatDate: () => '',
  className: undefined,
};

export const Text = withStyles(styles, { name: 'Text' })(TextBase);
