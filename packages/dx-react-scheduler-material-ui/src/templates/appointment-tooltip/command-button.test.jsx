import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
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

    it('should combine onClick event with handler', () => {
      const clickEvent = jest.fn();
      const handlerEvent = jest.fn();

      const tree = shallow((
        <CommandButton onClick={clickEvent} handler={handlerEvent} />
      ));

      tree.simulate('click');

      expect(clickEvent)
        .toBeCalled();
      expect(handlerEvent)
        .toBeCalled();
    });

    it('should render `open` button', () => {
      const editIcon = shallow((
        <CommandButton id="open" />
      )).find(EditIcon);

      expect(editIcon.exists())
        .toBeTruthy();
    });

    it('should render `close` button', () => {
      const closeIcon = shallow((
        <CommandButton id="close" />
      )).find(CloseIcon);

      expect(closeIcon.exists())
        .toBeTruthy();
    });

    it('should render `delete` button', () => {
      const deleteIcon = shallow((
        <CommandButton id="delete" />
      )).find(DeleteIcon);

      expect(deleteIcon.exists())
        .toBeTruthy();
    });
  });
});
