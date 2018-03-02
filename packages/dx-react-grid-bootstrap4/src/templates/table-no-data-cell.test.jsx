import * as React from 'react';
import { shallow } from 'enzyme';
import { TableNoDataCell } from './table-no-data-cell';

describe('TableNoDataCell', () => {
  const defaultProps = {
    getMessage: key => key,
  };
  it('should use "noData" text if defined', () => {
    const tree = shallow((
      <TableNoDataCell {...defaultProps} />
    ));

    expect(tree.find('big').text()).toBe('noData');
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableNoDataCell
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.py-5.text-center.custom-class'))
      .toBeTruthy();
  });
});
