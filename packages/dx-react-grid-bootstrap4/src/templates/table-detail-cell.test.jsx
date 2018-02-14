import * as React from 'react';
import { shallow } from 'enzyme';
import { TableDetailCell } from './table-detail-cell';

describe('TableDetailCell', () => {
  const defaultProps = {
    template: () => (<div />),
  };
  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableDetailCell
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.table-active.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableDetailCell
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
