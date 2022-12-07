import * as React from 'react';
import { styled, Button, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import CalendarToday from '@mui/icons-material/CalendarToday';
import classNames from 'clsx';
import { SMALL_LAYOUT_MEDIA_QUERY, LAYOUT_MEDIA_QUERY } from '../constants';

const PREFIX = 'OpenButton';

export const classes = {
  textButton: `${PREFIX}-textButton`,
  iconButton: `${PREFIX}-iconButton`,
};

const StyledButton = styled(Button)(() => ({
  [`&.${classes.textButton}`]: {
    [`${LAYOUT_MEDIA_QUERY}`]: {
      display: 'none',
    },
  },
}));

const StyledIconButton = styled(IconButton)(({ theme: { spacing } }) => ({
  [`&.${classes.iconButton}`]: {
    '@media (min-width: 700px)': {
      display: 'none',
    },
    [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
      width: spacing(4),
      height: spacing(4),
      padding: 0,
    },
  },
}));

export const OpenButton = React.memo(({
  text, onVisibilityToggle, className, ...restProps
}) => (
  <React.Fragment>
    <StyledButton
      onClick={onVisibilityToggle}
      className={classNames(classes.textButton, className)}
      {...restProps}
    >
      {text}
    </StyledButton>
    <StyledIconButton
      onClick={onVisibilityToggle}
      className={classNames(classes.iconButton, className)}
      {...restProps}
      size="large"
    >
      <CalendarToday />
    </StyledIconButton>
  </React.Fragment>
));

OpenButton.propTypes = {
  onVisibilityToggle: PropTypes.func.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
};

OpenButton.defaultProps = {
  text: '',
  className: undefined,
};
