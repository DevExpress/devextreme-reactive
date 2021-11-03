import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import classNames from 'clsx';
import CloseIcon from '@mui/icons-material/Close';

const PREFIX = 'CancelButton';

export const classes = {
  button: `${PREFIX}-button`,
};

const StyledIconButton = styled(IconButton)(() => ({
  [`&.${classes.button}`]: {
    marginRight: 'auto',
  },
}));

const CancelButtonBase = React.memo(({
  onExecute, className, ...restProps
}) => (
  <StyledIconButton
    className={classNames(classes.button, className)}
    onClick={onExecute}
    {...restProps}
    size="large"
  >
    <CloseIcon />
  </StyledIconButton>
));

CancelButtonBase.propTypes = {
  className: PropTypes.string,
  onExecute: PropTypes.func.isRequired,
};

CancelButtonBase.defaultProps = {
  className: undefined,
};

export const CancelButton = (CancelButtonBase);
