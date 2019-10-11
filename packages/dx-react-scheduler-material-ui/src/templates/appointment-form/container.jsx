import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';

const styles = {
  absoluteDiv: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingRight: '0px!important',
  },
};

const ContainerBase = React.forwardRef(({
  classes,
  className,
  ...restProps
}, ref) => (
  <div {...restProps}>
    <div className={classNames(classes.absoluteDiv, className)}>
      <div
        className={classes.absoluteDiv}
        ref={ref}
      />
    </div>
  </div>
));

ContainerBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ContainerBase.defaultProps = {
  className: undefined,
};

export const Container = withStyles(styles)(ContainerBase, { name: 'Container' });
