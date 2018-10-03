import * as React from 'react';
import * as PropTypes from 'prop-types';
import ButtonMUI from '@material-ui/core/Button';

export const Button = ({
  text,
  readOnly,
  onClick,
  appointment,
  ...restProps
}) => (
  <ButtonMUI
    color="primary"
    disabled={readOnly}
    onClick={onClick}
    {...restProps}
  >
    {text}
  </ButtonMUI>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  onClick: PropTypes.func,
  appointment: PropTypes.object,
};

Button.defaultProps = {
  readOnly: false,
  onClick: () => undefined,
  appointment: undefined,
};
