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
    expect(tree.find('.d-flex.flex-direction-row.align-items-center.text-nowrap').exists())
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableTreeCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should not apply nowrap class', () => {
    const tree = shallow((
      <TableTreeCell tableColumn={{ wordWrapEnabled: true }} />
    ));

    expect(tree.find('.d-flex.flex-direction-row.align-items-center').exists())
      .toBeTruthy();
  });

  it('should apply align right class', () => {
    const tree = shallow((
      <TableTreeCell tableColumn={{ align: 'right' }} />
    ));
    expect(tree.find('.d-flex.flex-direction-row.align-items-center.text-right').exists())
      .toBeTruthy();
  });

  it('should apply align center class', () => {
    const tree = shallow((
      <TableTreeCell tableColumn={{ align: 'center' }} />
    ));
    expect(tree.find('.d-flex.flex-direction-row.align-items-center.text-center').exists())
      .toBeTruthy();
  });
});
