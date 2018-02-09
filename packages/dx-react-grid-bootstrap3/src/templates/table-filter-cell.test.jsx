import * as React from 'react';
import { shallow } from 'enzyme';
import { TableFilterCell } from './table-filter-cell';

describe('TableFilterCell', () => {
  it('should not set filter with an empty value', () => {
    const onFilterMock = jest.fn();
    const tree = shallow((
      <TableFilterCell
        column={{
          name: 'Test',
        }}
        onFilter={onFilterMock}
        value="abc"
      />
    ));

    tree.find('input').simulate('change', { target: { value: '' } });
    expect(onFilterMock.mock.calls[0][0]).toBeNull();
  });

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

  it('should render readonly filtering editor if filtering is not allowed', () => {
    const tree = shallow((
      <TableFilterCell filteringEnabled={false} getMessage={key => key} />
    ));

    expect(tree.find('input').prop('readOnly'))
      .toBeTruthy();
  });
});
