import * as React from 'react';
import { shallow } from 'enzyme';
import { TableSelectCell } from './table-select-cell';

describe('TableSelectCell', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSelectCell className="custom-class" />
    ));

    expect(tree.is('.align-middle.dx-rg-bs4-cursor-pointer.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSelectCell data={{ a: 1 }} />
    ));
    expect(tree.find('td').prop('data'))
      .toEqual({ a: 1 });
  });
});
