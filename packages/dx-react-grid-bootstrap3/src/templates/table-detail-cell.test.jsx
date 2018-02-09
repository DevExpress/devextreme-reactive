import * as React from 'react';
import { shallow } from 'enzyme';
import { TableDetailCell } from './table-detail-cell';

describe('TableDetailCell', () => {
  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableDetailCell
        template={() => (<div />)}
        className="custom-class"
      />
    ));

    expect(tree.is('.active'))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableDetailCell
        template={() => (<div />)}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
