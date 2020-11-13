import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import {
  VERTICAL_TYPE, HORIZONTAL_TYPE,
  POSITION_START, POSITION_END,
} from '@devexpress/dx-scheduler-core';

const verticalStyles = spacing => ({
  width: '100%',
  height: spacing(1),
  cursor: 'ns-resize',
});

const horizontalStyles = spacing => ({
  width: spacing(1),
  height: '100%',
  cursor: 'ew-resize',
});

const styles = ({ spacing }) => {
  const vertical = verticalStyles(spacing);
  const horizontal = horizontalStyles(spacing);
  return ({
    resize: {
      position: 'absolute',
      zIndex: 100,
    },
    verticalStart: {
      ...vertical,
      top: 0,
    },
    verticalEnd: {
      ...vertical,
      bottom: 0,
    },
    horizontalStart: {
      ...horizontal,
      left: 0,
    },
    horizontalEnd: {
      ...horizontal,
      right: 0,
    },
  });
};

const ResizeBase = React.memo(({
  classes, className,
  position, appointmentType,
  forwardedRef, ...restProps
}) => {
  const vertical = appointmentType === VERTICAL_TYPE;
  const start = position === POSITION_START;
  return (
    <div
      ref={forwardedRef}
      className={classNames({
        [classes.resize]: true,
        [classes.verticalStart]: vertical && start,
        [classes.verticalEnd]: vertical && !start,
        [classes.horizontalStart]: !vertical && start,
        [classes.horizontalEnd]: !vertical && !start,
      }, className)}
      {...restProps}
    />
  );
});


ResizeBase.propTypes = {
  classes: PropTypes.object.isRequired,
  position: PropTypes.oneOf([POSITION_START, POSITION_END]).isRequired,
  appointmentType: PropTypes.oneOf([HORIZONTAL_TYPE, VERTICAL_TYPE]).isRequired,
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

ResizeBase.defaultProps = {
  className: undefined,
  forwardedRef: undefined,
};

export const Resize = withStyles(styles, { name: 'Resize' })(ResizeBase);
