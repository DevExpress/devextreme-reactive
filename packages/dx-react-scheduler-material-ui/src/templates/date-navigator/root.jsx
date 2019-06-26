import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = ({ spacing }) => ({
  root: {
    marginLeft: `${spacing.unit * 0.5}px`,
    '&:first-child': {
      marginLeft: 0,
    },
  },
});

const RootBase = ({
  navigationButtonComponent: NavigationButton,
  openButtonComponent: OpenButton,
  navigatorText,
  rootRef,
  onVisibilityToggle,
  onNavigate,
  className,
  classes,
  ...restProps
}) => (
  <div
    className={classNames(classes.root, className)}
    ref={rootRef}
    {...restProps}
  >
    <NavigationButton
      type="back"
      onClick={() => { onNavigate('back'); }}
    />
    <NavigationButton
      type="forward"
      onClick={() => { onNavigate('forward'); }}
    />
    <OpenButton
      onVisibilityToggle={onVisibilityToggle}
      text={navigatorText}
    />
  </div>
);

RootBase.propTypes = {
  onVisibilityToggle: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  rootRef: PropTypes.func.isRequired,
  navigationButtonComponent: PropTypes.func.isRequired,
  openButtonComponent: PropTypes.func.isRequired,
  navigatorText: PropTypes.string,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

RootBase.defaultProps = {
  navigatorText: '',
  className: undefined,
};

export const Root = withStyles(styles)(RootBase, { name: 'Root' });
