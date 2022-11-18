import * as React from 'react';
import PropTypes from 'prop-types';
import {
  SAVE_BUTTON,
  DELETE_BUTTON,
  CANCEL_BUTTON,
} from '@devexpress/dx-scheduler-core';
import { SaveButton } from './save-button';
import { DeleteButton } from './delete-button';
import { CancelButton } from './cancel-button';

export const CommandButton = React.memo(({
  id, getMessage, onExecute, ...restProps
}) => {
  switch (id) {
    case SAVE_BUTTON:
      return (
        <SaveButton
          getMessage={getMessage}
          onExecute={onExecute}
          {...restProps}
        />
      );
    case DELETE_BUTTON:
      return (
        <DeleteButton
          onExecute={onExecute}
          {...restProps}
        />
      );
    case CANCEL_BUTTON:
      return (
        <CancelButton
          onExecute={onExecute}
          {...restProps}
        />
      );
    default:
      return null;
  }
});

CommandButton.propTypes = {
  id: PropTypes.string.isRequired,
  onExecute: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
};
