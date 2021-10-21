import * as React from 'react';
import * as PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'clsx';

const useStyles = makeStyles(theme => ({
  line: {
    height: '2px',
    width: '100%',
    transform: 'translate(0, -1px)',
  },
  circle: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
  },
  nowIndicator: {
    position: 'absolute',
    left: 0,
    top: ({ top }) => top,
    background: theme.palette.secondary.main,
    zIndex: 1,
  },
}));

export const Indicator = ({
  top, ...restProps
}) => {
  const classes = useStyles({ top });

  return (
    <div {...restProps}>
      <div className={classNames(classes.nowIndicator, classes.circle)} />
      <div className={classNames(classes.nowIndicator, classes.line)} />
    </div>
  );
};

Indicator.propTypes = {
  top: PropTypes.string,
};

Indicator.defaultProps = {
  top: 0,
};
