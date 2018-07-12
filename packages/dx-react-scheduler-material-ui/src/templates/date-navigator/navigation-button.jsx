import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

export const NavigationButton = ({
  back,
  ...restProps
}) => (
  <IconButton
    color="inherit"
    {...restProps}
  >
    {back ? <ChevronLeft /> : <ChevronRight />}
  </IconButton>
);

NavigationButton.propTypes = {
  back: PropTypes.bool,
};

NavigationButton.defaultProps = {
  back: false,
};
