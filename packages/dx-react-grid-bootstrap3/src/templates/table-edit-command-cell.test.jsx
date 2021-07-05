import * as React from 'react';
import { shallow } from 'enzyme';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { EditCommandHeadingCell, EditCommandCell, CommandButton } from './table-edit-command-cell';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

describe('EditCommandCells', () => {
  describe('EditCommandCell', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <EditCommandCell className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });

    it('should call withKeyboardNavigation', () => {
      shallow((
        <EditCommandCell />
      ));

      expect(withKeyboardNavigation).toBeCalledWith();
    });
  });

  describe('EditCommandHeadingCell', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <EditCommandHeadingCell className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });

    it('should call withKeyboardNavigation', () => {
      shallow((
        <EditCommandCell />
      ));

      expect(withKeyboardNavigation).toBeCalledWith();
    });
  });

  describe('CommandButton', () => {
    it('should pass the className prop to the root element', () => {
      const tree = shallow((
        <CommandButton
          onExecute={() => {}}
          text=""
          className="custom-class"
        />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.btn'))
        .toBeTruthy();
      expect(tree.is('.btn-link'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <CommandButton
          onExecute={() => {}}
          text=""
          data={{ a: 1 }}
        />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
