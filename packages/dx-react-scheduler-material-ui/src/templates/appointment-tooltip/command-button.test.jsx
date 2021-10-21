import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { OPEN_COMMAND_BUTTON, CLOSE_COMMAND_BUTTON, DELETE_COMMAND_BUTTON } from '@devexpress/dx-scheduler-core';
import { CommandButton } from './command-button';

describe('Appointment Tooltip', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });
  describe('CommandButton', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <CommandButton data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render `open` button', () => {
      const button = shallow((
        <CommandButton id={OPEN_COMMAND_BUTTON} />
      ));
      expect(button.find(IconButton).exists())
        .toBeTruthy();
      expect(button.find(EditIcon).exists())
        .toBeTruthy();
    });

    it('should render `close` button', () => {
      const button = shallow((
        <CommandButton id={CLOSE_COMMAND_BUTTON} />
      ));

      expect(button.find(IconButton).exists())
        .toBeTruthy();
      expect(button.find(CloseIcon).exists())
        .toBeTruthy();
    });

    it('should render `delete` button', () => {
      const button = shallow((
        <CommandButton id={DELETE_COMMAND_BUTTON} />
      ));

      expect(button.find(IconButton).exists())
        .toBeTruthy();
      expect(button.find(DeleteIcon).exists())
        .toBeTruthy();
    });

    it('should call onExecute function by click', () => {
      const onExecute = jest.fn();
      const tree = shallow((
        <CommandButton onClick={onExecute} />
      ));

      tree.simulate('click');
      expect(onExecute).toBeCalled();
    });
  });
});
