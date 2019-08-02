import * as React from 'react';
import * as PropTypes from 'prop-types';
import ButtonMUI from '@material-ui/core/Button';
// import classNames from 'classnames';

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
  children: PropTypes.node.isRequired,
};
