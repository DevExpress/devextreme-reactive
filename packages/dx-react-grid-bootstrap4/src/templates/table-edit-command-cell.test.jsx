import * as React from 'react';
import { shallow } from 'enzyme';
import { EditCommandHeadingCell, EditCommandCell, CommandButton } from './table-edit-command-cell';

describe('EditCommandCells', () => {
  describe('EditCommandCell', () => {
    it('should pass custom class to the root element', () => {
      const tree = shallow((
        <EditCommandCell className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.p-0'))
        .toBeTruthy();
      expect(tree.is('.text-nowrap'))
        .toBeTruthy();
      expect(tree.is('.text-center'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <EditCommandCell data={{ a: 1 }} />
      ));
      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });

  describe('EditCommandHeadingCell', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <EditCommandHeadingCell className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.p-0'))
        .toBeTruthy();
      expect(tree.is('.text-nowrap'))
        .toBeTruthy();
      expect(tree.is('.text-center'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <EditCommandHeadingCell data={{ a: 1 }} />
      ));
      expect(tree.props().data)
        .toMatchObject({ a: 1 });
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
      expect(tree.is('.table-edit-command-cell'))
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
