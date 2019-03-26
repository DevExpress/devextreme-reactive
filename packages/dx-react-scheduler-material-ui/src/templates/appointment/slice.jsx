import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { VERTICAL_TYPE } from '@devexpress/dx-scheduler-core';

const verticalStyles = {
  width: '100%',
  height: '10px',
};

const horizontalStyles = {
  top: 0,
  width: '10px',
  height: '100%',
};

const styles = {
  slice: {
    position: 'absolute',
    zIndex: 50,
  },
  verticalTop: {
    ...verticalStyles,
    top: '-10px',
    boxShadow: '0 10px 40px black',
  },
  verticalBottom: {
    ...verticalStyles,
    bottom: '-10px',
    boxShadow: '0 -10px 40px black',
  },
  horizontalTop: {
    ...horizontalStyles,
    left: '-10px',
    boxShadow: '10px 0 40px black',
  },
  horizontalBottom: {
    ...horizontalStyles,
    right: '-10px',
    boxShadow: '-10px 0 40px black',
  },
};

const SliceBase = ({
  position, appointmentType, classes, className, ...restProps
}) => {
  const vertical = appointmentType === VERTICAL_TYPE;
  const top = position === 'top';
  return (
    <div
      className={classNames({
        [classes.slice]: true,
        [classes.verticalTop]: vertical && top,
        [classes.verticalBottom]: vertical && !top,
        [classes.horizontalTop]: !vertical && top,
        [classes.horizontalBottom]: !vertical && !top,
      }, className)}
      {...restProps}
    />
  );
};

SliceBase.propTypes = {
  classes: PropTypes.object.isRequired,
  appointmentType: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SliceBase.defaultProps = {
  className: undefined,
};

export const Slice = withStyles(styles, { name: 'AppointmentsContainer' })(SliceBase);
