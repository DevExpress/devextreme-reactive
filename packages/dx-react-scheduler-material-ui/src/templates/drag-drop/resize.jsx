import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = {
  resize: {
    cursor: 'ns-resize',
    width: '100%',
    height: '6px',
  },
};

const ResizeBase = ({
  classes, className,
  data, type, ...restProps
}) => (
  <div {...restProps} className={classNames(classes.resize, className)} />
);

ResizeBase.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ResizeBase.defaultProps = {
  className: undefined,
};

export const Resize = withStyles(styles, { name: 'Resize' })(ResizeBase);
