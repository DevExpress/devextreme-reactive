import * as React from 'react';
import { shallow } from 'enzyme';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { Cell } from './cell';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

describe('TableCell', () => {
  it('should render children if passed', () => {
    const tree = shallow((
      <Cell>
        <span className="test" />
      </Cell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <Cell className="custom-class" />
    ));

    expect(tree.is('.custom-class.dx-g-bs4-banded-cell.text-nowrap.dx-g-bs4-table-cell.border-right'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Cell data={{ a: 1 }} />
    ));
    expect(tree.find('th').prop('data'))
      .toMatchObject({ a: 1 });
  });

  it('should apply left border if necessary', () => {
    const tree = shallow((
      <Cell beforeBorder />
    ));

    expect(tree.is('.border-left.dx-g-bs4-banded-cell.text-nowrap.dx-g-bs4-table-cell.border-right'))
      .toBeTruthy();
  });

  it('should call withKeyboardNavigation', () => {
    shallow((
      <Cell />
    ));

    expect(withKeyboardNavigation).toBeCalledWith();
  });

  it('should apply class for keyboard navigation', () => {
    const tree = shallow((
      <Cell updateRefForKeyboardNavigation={() => {}} />
    ));

    expect(tree.is('.dx-g-bs4-banded-cell.dx-g-bs4-table-cell.text-nowrap.border-right.dx-g-bs4-focus-cell'))
      .toBeTruthy();
  });
});
