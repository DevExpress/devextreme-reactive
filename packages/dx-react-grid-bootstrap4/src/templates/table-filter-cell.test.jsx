import * as React from 'react';
import { shallow } from 'enzyme';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { TableFilterCell } from './table-filter-cell';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

describe('TableFilterCell', () => {
  it('should render children if passed', () => {
    const tree = shallow((
      <TableFilterCell>
        <span className="test" />
      </TableFilterCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableFilterCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableFilterCell data={{ a: 1 }} />
    ));
    expect(tree.find('th').prop('data'))
      .toEqual({ a: 1 });
  });

  it('should call withKeyboardNavigation', () => {
    shallow((
      <TableFilterCell />
    ));

    expect(withKeyboardNavigation).toBeCalledWith();
  });

  it('should apply class for keyboard navigation', () => {
    const tree = shallow((
      <TableFilterCell updateRefForKeyboardNavigation={() => {}} />
    ));

    expect(tree.is('.dx-g-bs4-focus-cell'))
      .toBeTruthy();
  });
});
