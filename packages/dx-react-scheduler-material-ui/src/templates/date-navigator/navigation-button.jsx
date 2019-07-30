import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

export const NavigationButton = React.memo(({
  type,
  onClick,
  ...restProps
}) => (
  <IconButton
    onClick={onClick}
    {...restProps}
  >
    {type === 'back' ? <ChevronLeft /> : <ChevronRight />}
  </IconButton>
));

NavigationButton.propTypes = {
  type: PropTypes.oneOf(['forward', 'back']).isRequired,
  onClick: PropTypes.func,
};

NavigationButton.defaultProps = {
  onClick: () => {},
};
