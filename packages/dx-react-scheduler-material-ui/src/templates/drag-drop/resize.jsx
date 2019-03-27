import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { VERTICAL_TYPE } from '@devexpress/dx-scheduler-core';

const verticalStyles = {
  width: '100%',
  height: '6px',
  cursor: 'ns-resize',
};

const horizontalStyles = {
  width: '6px',
  height: '100%',
  cursor: 'ew-resize',
};

const styles = {
  resize: {
    position: 'absolute',
    zIndex: 100,
  },
  verticalTop: {
    ...verticalStyles,
    top: 0,
  },
  verticalBottom: {
    ...verticalStyles,
    bottom: 0,
  },
  horizontalTop: {
    ...horizontalStyles,
    left: 0,
  },
  horizontalBottom: {
    ...horizontalStyles,
    right: 0,
  },
};

const ResizeBase = ({
  classes, className,
  position, appointmentType, ...restProps
}) => {
  const vertical = appointmentType === VERTICAL_TYPE;
  const top = position === 'top';
  return (
    <div
      className={classNames({
        [classes.resize]: true,
        [classes.verticalTop]: vertical && top,
        [classes.verticalBottom]: vertical && !top,
        [classes.horizontalTop]: !vertical && top,
        [classes.horizontalBottom]: !vertical && !top,
      }, className)}
      {...restProps}
    />
  );
};


ResizeBase.propTypes = {
  classes: PropTypes.object.isRequired,
  position: PropTypes.string.isRequired,
  appointmentType: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ResizeBase.defaultProps = {
  className: undefined,
};

export const Resize = withStyles(styles, { name: 'Resize' })(ResizeBase);
