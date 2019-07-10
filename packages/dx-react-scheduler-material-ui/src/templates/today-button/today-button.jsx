import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

const styles = ({ spacing }) => ({
  button: {
    padding: `${spacing(0.8)}px ${spacing(2)}px`,
    marginLeft: `${spacing(0.5)}px`,
    '&:first-child': {
      marginLeft: 0,
    },
  },
});

const TodayButtonBase = ({
  setCurrentDate, classes, getMessage, className, ...restProps
}) => {
  const handleClick = () => {
    setCurrentDate(new Date());
  };
  return (
    <Button
      className={classNames(classes.button, className)}
      variant="outlined"
      onClick={handleClick}
      {...restProps}
    >
      {getMessage('today')}
    </Button>
  );
};

TodayButtonBase.propTypes = {
  setCurrentDate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
};

TodayButtonBase.defaultProps = {
  className: undefined,
};

export const TodayButton = withStyles(styles)(TodayButtonBase, { name: 'TodayButton' });
