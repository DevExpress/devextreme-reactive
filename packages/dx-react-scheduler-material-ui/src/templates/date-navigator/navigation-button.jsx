import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { XS_LAYOUT } from '../constants';

const styles = ({ spacing }) => ({
  button: {
    [`${XS_LAYOUT}`]: {
      width: spacing(4),
      height: spacing(4),
      padding: 0,
    },
  },
});

const NavigationButtonBase = React.memo(({
  type,
  onClick,
  classes,
  className,
  ...restProps
}) => (
  <IconButton
    onClick={onClick}
    className={classNames(classes.button, className)}
    {...restProps}
  >
    {type === 'back' ? <ChevronLeft /> : <ChevronRight />}
  </IconButton>
));

NavigationButtonBase.propTypes = {
  type: PropTypes.oneOf(['forward', 'back']).isRequired,
  onClick: PropTypes.func,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

NavigationButtonBase.defaultProps = {
  onClick: () => {},
  className: undefined,
};

export const NavigationButton = withStyles(styles, { name: 'NavigationButton' })(NavigationButtonBase);
