import * as React from 'react';
import * as PropTypes from 'prop-types';
import ButtonMUI from '@material-ui/core/Button';

export const Button = ({
  text,
  readOnly,
  onClick,
}) => {
  return (
    <ButtonMUI
      color="primary"
      disabled={readOnly}
      onClick={onClick}
    >
      {text}
    </ButtonMUI>
  );
};
