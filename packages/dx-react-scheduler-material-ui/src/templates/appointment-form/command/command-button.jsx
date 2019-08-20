import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  SAVE_BUTTON,
  DELETE_BUTTON,
  CANCEL_BUTTON,
} from '@devexpress/dx-scheduler-core';
import { SaveButton } from './save-button';
import { DeleteButton } from './delete-button';
import { CancelButton } from './cancel-button';

export const CommandButton = ({
  id, getMessage,
  ...restProps
}) => {
  switch (id) {
    case SAVE_BUTTON:
      return (
        <SaveButton getMessage={getMessage} {...restProps} />
      );
    case DELETE_BUTTON:
      return (
        <DeleteButton {...restProps} />
      );
    case CANCEL_BUTTON:
      return (
        <CancelButton {...restProps} />
      );
    default:
      return null;
  }
};

CommandButton.propTypes = {
  id: PropTypes.string.isRequired,
  getMessage: PropTypes.func.isRequired,
};
