import * as React from 'react';
import { shallow } from 'enzyme';
import { TableTreeCell } from './table-tree-cell';

describe('TableTreeCell', () => {
  it('should render children if passed', () => {
    const tree = shallow((
      <TableTreeCell>
        <span className="test" />
      </TableTreeCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass style to the root element', () => {
    const tree = shallow((
      <TableTreeCell
        style={{ color: 'gray' }}
      />
    ));

    expect(tree.prop('style'))
      .toEqual({
        color: 'gray',
        textAlign: 'left',
        whiteSpace: 'nowrap',
      });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableTreeCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should not apply nowrap style', () => {
    const tree = shallow((
      <TableTreeCell tableColumn={{ wordWrapEnabled: true }} />
    ));

    expect(tree.prop('style'))
      .toEqual({
        textAlign: 'left',
        whiteSpace: 'normal',
      });
  });
});
