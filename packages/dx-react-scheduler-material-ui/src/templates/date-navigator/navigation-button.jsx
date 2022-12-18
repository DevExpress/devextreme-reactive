import * as React from 'react';
import { styled, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import classNames from 'clsx';
import { SMALL_LAYOUT_MEDIA_QUERY } from '../constants';

const PREFIX = 'NavigationButton';

export const classes = {
  button: `${PREFIX}-button`,
};

const StyledIconButton = styled(IconButton)(({ theme: { spacing } }) => ({
  [`&.${classes.button}`]: {
    [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
      width: spacing(4),
      height: spacing(4),
      padding: 0,
    },
  },
}));

export const NavigationButton = React.memo(({
  type,
  onClick,
  className,
  ...restProps
}) => (
  <StyledIconButton
    onClick={onClick}
    color="primary"
    className={classNames(classes.button, className)}
    {...restProps}
    size="large"
  >
    {type === 'back' ? <ChevronLeft /> : <ChevronRight />}
  </StyledIconButton>
));

NavigationButton.propTypes = {
  type: PropTypes.oneOf(['forward', 'back']).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

NavigationButton.defaultProps = {
  onClick: () => {},
  className: undefined,
};
