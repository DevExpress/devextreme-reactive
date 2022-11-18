import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import classNames from 'clsx';
import { ensureColor } from '../../utils';

const PREFIX = 'SaveButton';

export const classes = {
  button: `${PREFIX}-button`,
  textButton: `${PREFIX}-textButton`,
};

export const StyledButton = styled(Button)(({
  theme: { spacing, palette },
}) => ({
  [`&.${classes.button}`]: {
    padding: spacing(0.5, 3.5),
    marginLeft: spacing(3),
    height: spacing(4.5),
    '&:first-of-type': {
      marginLeft: 0,
    },
    backgroundColor: ensureColor(300, palette.primary),
    '&:hover': {
      backgroundColor: ensureColor(400, palette.primary),
    },
  },
  [`&.${classes.textButton}`]: {
    color: palette.primary.contrastText,
  },
}));

export const SaveButton = React.memo(({
  getMessage, className, onExecute, ...restProps
}) => (
  <StyledButton
    className={classNames({
      [classes.button]: true,
      [classes.textButton]: !restProps.disabled,
    }, className)}
    onClick={onExecute}
    {...restProps}
  >
    {getMessage('commitCommand')}
  </StyledButton>
));

SaveButton.propTypes = {
  className: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
  onExecute: PropTypes.func.isRequired,
};

SaveButton.defaultProps = {
  className: undefined,
};
