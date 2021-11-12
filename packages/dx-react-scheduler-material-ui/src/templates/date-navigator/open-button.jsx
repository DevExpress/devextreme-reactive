import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import CalendarToday from '@mui/icons-material/CalendarToday';
import IconButton from '@mui/material/IconButton';
import classNames from 'clsx';
import { SMALL_LAYOUT_MEDIA_QUERY, LAYOUT_MEDIA_QUERY } from '../constants';

const PREFIX = 'OpenButton';

export const classes = {
  textButton: `${PREFIX}-textButton`,
  iconButton: `${PREFIX}-iconButton`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
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

const OpenButtonBase = React.memo(({
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

OpenButtonBase.propTypes = {
  onVisibilityToggle: PropTypes.func.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
};

OpenButtonBase.defaultProps = {
  text: '',
  className: undefined,
};

export const OpenButton = (OpenButtonBase);
