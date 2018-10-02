import * as React from 'react';
import * as PropTypes from 'prop-types';
import ButtonMUI from '@material-ui/core/Button';

export const Button = ({
  text,
  readOnly,
  onClick,
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
};

Button.defaultProps = {
  readOnly: false,
  onClick: () => undefined,
};
