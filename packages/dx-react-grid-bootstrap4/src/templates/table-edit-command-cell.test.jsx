import * as React from 'react';
import { shallow } from 'enzyme';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { EditCommandHeadingCell, EditCommandCell, CommandButton } from './table-edit-command-cell';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

describe('EditCommandCells', () => {
  describe('EditCommandCell', () => {
    it('should pass custom class to the root element', () => {
      const tree = shallow((
        <EditCommandCell className="custom-class" />
      ));

      expect(tree.is('.p-0.text-nowrap.text-center.custom-class'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <EditCommandCell data={{ a: 1 }} />
      ));
      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should call withKeyboardNavigation', () => {
      shallow((
        <EditCommandCell />
      ));

      expect(withKeyboardNavigation).toBeCalledWith();
    });

    it('should apply class for keyboard navigation', () => {
      const tree = shallow((
        <EditCommandCell updateRefForKeyboardNavigation={() => {}} />
      ));

      expect(tree.is('.text-center.p-0.text-nowrap.dx-g-bs4-focus-cell'))
        .toBeTruthy();
    });
  });

  describe('EditCommandHeadingCell', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <EditCommandHeadingCell className="custom-class" />
      ));

      expect(tree.is('.p-0.text-nowrap.text-center.custom-class'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <EditCommandHeadingCell data={{ a: 1 }} />
      ));
      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should call withKeyboardNavigation', () => {
      shallow((
        <EditCommandHeadingCell />
      ));

      expect(withKeyboardNavigation).toBeCalledWith();
    });

    it('should apply class for keyboard navigation', () => {
      const tree = shallow((
        <EditCommandHeadingCell updateRefForKeyboardNavigation={() => {}} />
      ));

      expect(tree.is('.text-center.p-0.text-nowrap.dx-g-bs4-focus-cell'))
        .toBeTruthy();
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

      expect(tree.is('.btn.btn-link.dx-g-bs4-table-edit-command-cell.custom-class'))
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
