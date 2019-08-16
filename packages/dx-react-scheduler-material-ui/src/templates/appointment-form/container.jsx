import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = {
  absoluteDiv: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
};

const ContainerBase = ({
  classes,
  className,
  anchor,
  ...restProps
}) => (
  <div {...restProps}>
    <div className={classNames(classes.absoluteDiv, className)}>
      <div
        className={classes.absoluteDiv}
        ref={anchor}
      />
    </div>
  </div>
);

ContainerBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  anchor: PropTypes.node.isRequired,
};

ContainerBase.defaultProps = {
  className: undefined,
};

export const Container = withStyles(styles)(ContainerBase, { name: 'Container' });
