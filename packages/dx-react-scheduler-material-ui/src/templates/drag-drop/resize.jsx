import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  VERTICAL_TYPE, HORIZONTAL_TYPE,
  POSITION_TOP, POSITION_BOTTOM,
} from '@devexpress/dx-scheduler-core';

const verticalStyles = spacing => ({
  width: '100%',
  height: spacing.unit,
  cursor: 'ns-resize',
});

const horizontalStyles = spacing => ({
  width: spacing.unit,
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
    verticalTop: {
      ...vertical,
      top: 0,
    },
    verticalBottom: {
      ...vertical,
      bottom: 0,
    },
    horizontalTop: {
      ...horizontal,
      left: 0,
    },
    horizontalBottom: {
      ...horizontal,
      right: 0,
    },
  });
};

const ResizeBase = ({
  classes, className,
  position, appointmentType, ...restProps
}) => {
  const vertical = appointmentType === VERTICAL_TYPE;
  const top = position === POSITION_TOP;
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
  position: PropTypes.oneOf([POSITION_TOP, POSITION_BOTTOM]).isRequired,
  appointmentType: PropTypes.oneOf([HORIZONTAL_TYPE, VERTICAL_TYPE]).isRequired,
  className: PropTypes.string,
};

ResizeBase.defaultProps = {
  className: undefined,
};

export const Resize = withStyles(styles, { name: 'Resize' })(ResizeBase);
