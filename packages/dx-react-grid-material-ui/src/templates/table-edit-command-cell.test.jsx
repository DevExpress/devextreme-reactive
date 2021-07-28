import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import {
  CommandButton,
  EditCommandHeadingCell,
  EditCommandCell,
} from './table-edit-command-cell';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

describe('TableCommandColumn', () => {
  describe('EditCommandHeadingCell', () => {
    let shallow;
    let classes;
    beforeAll(() => {
      shallow = createShallow({ dive: true });
      classes = getClasses((
        <EditCommandHeadingCell />
      ));
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <EditCommandHeadingCell className="custom-class" />
      ));

      expect(tree.is(`.${classes.headingCell}`))
        .toBeTruthy();
      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <EditCommandHeadingCell data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should apply correct align if rowSpan is defined', () => {
      const rowSpan = 3;
      const tree = shallow((
        <EditCommandHeadingCell rowSpan={rowSpan} />
      ));

      expect(tree.is(`.${classes.alignWithRowSpan}.${classes.headingCell}`))
        .toBeTruthy();
    });

    it('should have focus style', () => {
      let tree = shallow((<EditCommandHeadingCell />));
      expect(tree.is(`.${classes.focusedCell}`)).toBeFalsy();

      tree = shallow((<EditCommandHeadingCell updateRefForKeyboardNavigation={() => {}} />));
      expect(tree.is(`.${classes.focusedCell}`)).toBeTruthy();
    });
  });

  describe('EditCommandCell', () => {
    let shallow;
    let classes;
    beforeAll(() => {
      shallow = createShallow({ dive: true });
      classes = getClasses((
        <EditCommandCell />
      ));
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <EditCommandCell className="custom-class" />
      ));

      expect(tree.is(`.${classes.cell}`))
        .toBeTruthy();
      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <EditCommandCell data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should have focus style', () => {
      let tree = shallow((<EditCommandCell />));
      expect(tree.is(`.${classes.focusedCell}`)).toBeFalsy();

      tree = shallow((<EditCommandCell updateRefForKeyboardNavigation={() => {}} />));
      expect(tree.is(`.${classes.focusedCell}`)).toBeTruthy();
    });
  });

  describe('CommandButton', () => {
    let shallow;
    let classes;
    beforeAll(() => {
      shallow = createShallow({ dive: true });
      classes = getClasses((
        <CommandButton
          onExecute={() => {}}
          text=""
        />
      ));
    });

    it('should pass the className prop to the root element', () => {
      const tree = shallow((
        <CommandButton
          onExecute={() => {}}
          text=""
          className="custom-class"
        />
      ));

      expect(tree.is(`.${classes.button}`))
        .toBeTruthy();
      expect(tree.is('.custom-class'))
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
