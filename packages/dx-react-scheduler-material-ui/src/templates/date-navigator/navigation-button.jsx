import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import withStyles from '@mui/styles/withStyles';
import classNames from 'clsx';
import { SMALL_LAYOUT_MEDIA_QUERY } from '../constants';

const styles = ({ spacing }) => ({
  button: {
    [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
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
    size="large"
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
