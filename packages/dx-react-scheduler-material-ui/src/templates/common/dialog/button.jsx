import * as React from 'react';
import * as PropTypes from 'prop-types';
import ButtonMUI from '@mui/material/Button';

export const Button = ({
  onClick, title, ...restProps
}) => (
  <ButtonMUI
    onClick={onClick}
    {...restProps}
  >
    {title}
  </ButtonMUI>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
};

Button.defaultProps = {
  title: '',
};
