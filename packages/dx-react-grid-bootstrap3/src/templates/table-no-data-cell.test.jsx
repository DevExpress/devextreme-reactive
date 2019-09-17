import * as React from 'react';
import { shallow } from 'enzyme';
import { TableNoDataCell } from './table-no-data-cell';

describe('TableNoDataCell', () => {
  it('should use "noData" text if defined', () => {
    const tree = shallow((
      <TableNoDataCell getMessage={key => key} />
    ));

    expect(tree.find('big').text()).toBe('noData');
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableNoDataCell
        getMessage={key => key}
        className="custom-class"
      />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should set sticky position for text container', () => {
    const tree = shallow((
      <TableNoDataCell
        getMessage={key => key}
      />
    ));

    expect(tree.find('div').props().style)
      .toEqual({
        display: 'inline-block',
        position: 'sticky',
        left: '50%',
      });
  });

  it('should align text to the center', () => {
    const tree = shallow((
      <TableNoDataCell
        getMessage={key => key}
      />
    ));

    expect(tree.find('big').props().style)
      .toEqual({
        display: 'inline-block',
        transform: 'translateX(-50%)',
        msTransform: 'translateX(-50%)',
      });
  });
});
