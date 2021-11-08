import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import classNames from 'clsx';
import DeleteIcon from '@mui/icons-material/Delete';

const PREFIX = 'DeleteButton';

export const classes = {
  button: `${PREFIX}-button`,
};

const StyledIconButton = styled(IconButton)(({ theme: { spacing } }) => ({
  [`&.${classes.button}`]: {
    marginRight: spacing(0.5),
  },
}));

const DeleteButtonBase = React.memo(({
  onExecute, className, ...restProps
}) => (
  <StyledIconButton
    className={classNames(classes.button, className)}
    onClick={onExecute}
    {...restProps}
    size="large"
  >
    <DeleteIcon />
  </StyledIconButton>
));

DeleteButtonBase.propTypes = {
  className: PropTypes.string,
  onExecute: PropTypes.func.isRequired,
};

DeleteButtonBase.defaultProps = {
  className: undefined,
};

export const DeleteButton = (DeleteButtonBase);
