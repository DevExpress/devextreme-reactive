import * as React from 'react';
import { shallow } from 'enzyme';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { TableStubHeaderCell } from './table-stub-header-cell';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

describe('TableStubHeaderCell', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableStubHeaderCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should call withKeyboardNavigation', () => {
    shallow((
      <TableStubHeaderCell />
    ));

    expect(withKeyboardNavigation).toBeCalledWith();
  });
});
