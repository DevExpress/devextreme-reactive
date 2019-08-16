import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import {
  SAVE_BUTTON,
  DELETE_BUTTON,
  CANCEL_BUTTON,
} from '@devexpress/dx-scheduler-core';
import { SaveButton } from './save-button';
import { ControlButton } from './control-button';
import { CancelButton } from './cancel-button';
import { DeleteButton } from './delete-button';

describe('AppointmentForm control', () => {
  const defaultProps = {
    onExecute: jest.fn(),
  };
  let shallow;
  let mount;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  describe('ControlButton', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <ControlButton
          data={{ a: 1 }}
          id={SAVE_BUTTON}
          getMessage={key => key}
          {...defaultProps}
        />
      ));

      expect(tree.prop('data'))
        .toMatchObject({ a: 1 });
    });

    it('should render SaveButton if id is equal to SAVE_BUTTON', () => {
      const tree = mount((
        <ControlButton
          id={SAVE_BUTTON}
          getMessage={key => key}
          {...defaultProps}
        />
      ));

      expect(tree.find(SaveButton).exists())
        .toBeTruthy();
    });

    it('should render CancelButton if id is equal to CANCEL_BUTTON', () => {
      const tree = mount((
        <ControlButton
          id={CANCEL_BUTTON}
          {...defaultProps}
        />
      ));

      expect(tree.find(CancelButton).exists())
        .toBeTruthy();
    });

    it('should render DeleteButton if id is equal to DELETE_BUTTON', () => {
      const tree = mount((
        <ControlButton
          id={DELETE_BUTTON}
          {...defaultProps}
        />
      ));

      expect(tree.find(DeleteButton).exists())
        .toBeTruthy();
    });

    it('shouldn\'t render anything if id is not equal to DELETE_BUTTON, CANCEL_BUTTON or SAVE_BUTTON', () => {
      const tree = mount((
        <ControlButton
          id="Wrong id"
          {...defaultProps}

        />
      ));

      expect(tree.find(DeleteButton).exists())
        .toBeFalsy();
      expect(tree.find(CancelButton).exists())
        .toBeFalsy();
      expect(tree.find(SaveButton).exists())
        .toBeFalsy();
    });
  });
});
