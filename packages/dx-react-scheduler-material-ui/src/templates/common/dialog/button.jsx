import * as React from 'react';
import PropTypes from 'prop-types';
import { Button as ButtonMUI } from '@mui/material';

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
