import * as React from 'react';
import { shallow } from 'enzyme';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { TableStubCell } from './table-stub-cell';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

describe('TableStubCell', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableStubCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should call withKeyboardNavigation', () => {
    shallow((
      <TableStubCell />
    ));

    expect(withKeyboardNavigation).toBeCalledWith();
  });
});
