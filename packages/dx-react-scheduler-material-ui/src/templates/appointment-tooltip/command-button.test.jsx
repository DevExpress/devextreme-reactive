import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { OPEN_COMMAND_BUTTON, CLOSE_COMMAND_BUTTON, DELETE_COMMAND_BUTTON } from '@devexpress/dx-scheduler-core';
import { CommandButton } from './command-button';

describe('Appointment Tooltip', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<CommandButton />);
    shallow = createShallow({ dive: true });
  });
  describe('CommandButton', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <CommandButton className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.button}`))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <CommandButton data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render `open` button', () => {
      const editIcon = shallow((
        <CommandButton id={OPEN_COMMAND_BUTTON} />
      )).find(EditIcon);

      expect(editIcon.exists())
        .toBeTruthy();
    });

    it('should render `close` button', () => {
      const closeIcon = shallow((
        <CommandButton id={CLOSE_COMMAND_BUTTON} />
      )).find(CloseIcon);

      expect(closeIcon.exists())
        .toBeTruthy();
    });

    it('should render `delete` button', () => {
      const deleteIcon = shallow((
        <CommandButton id={DELETE_COMMAND_BUTTON} />
      )).find(DeleteIcon);

      expect(deleteIcon.exists())
        .toBeTruthy();
    });
  });
});
