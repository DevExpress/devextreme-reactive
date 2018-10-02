import * as React from 'react';
import * as PropTypes from 'prop-types';
import ButtonMUI from '@material-ui/core/Button';

export const Button = ({
  text,
  readOnly,
}) => {
  return (
    <ButtonMUI
      // variant="outlined"
      color="primary"
      disabled={readOnly}
    >
      {text}
    </ButtonMUI>
  );
};
