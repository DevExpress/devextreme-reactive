import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
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

const NavigationButtonBase = React.memo(({
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

NavigationButtonBase.propTypes = {
  type: PropTypes.oneOf(['forward', 'back']).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

NavigationButtonBase.defaultProps = {
  onClick: () => {},
  className: undefined,
};

export const NavigationButton = (NavigationButtonBase);
