import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export const CloseButton = ({
  ...restProps
}) => (
  <IconButton aria-label="Close">
    <CloseIcon />
  </IconButton>
);
