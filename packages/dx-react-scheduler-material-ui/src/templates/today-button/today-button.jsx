import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Button from '@mui/material/Button';
import classNames from 'clsx';
import { LAYOUT_MEDIA_QUERY } from '../constants';

const styles = ({ spacing }) => ({
  button: {
    padding: spacing(0.8, 2),
    marginLeft: spacing(0.5),
    '&:first-child': {
      marginLeft: 0,
    },
    [`${LAYOUT_MEDIA_QUERY}`]: {
      fontSize: '0.75rem',
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
