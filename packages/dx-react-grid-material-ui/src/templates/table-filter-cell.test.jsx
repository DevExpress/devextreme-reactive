import * as React from 'react';
import { createShallow, getClasses } from 'material-ui/test-utils';
import Input from 'material-ui/Input';
import { TableFilterCell } from './table-filter-cell';

const defaultProps = {
  getMessage: key => key,
  iconComponent: () => null,
};

describe('TableFilterCell', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TableFilterCell {...defaultProps} />);
  });

  it('can use filter placeholder', () => {
    const tree = shallow((
      <TableFilterCell
        {...defaultProps}
        column={{
          name: 'Test',
        }}
      />
    ));

    expect(tree.find(Input).prop('placeholder')).toBe('filterPlaceholder');
  });

  it('should not set filter with an empty value', () => {
    const onFilterMock = jest.fn();
    const tree = shallow((
      <TableFilterCell
        {...defaultProps}
        column={{
          name: 'Test',
        }}
        onFilter={onFilterMock}
        value="abc"
      />
    ));

    tree.find(Input).simulate('change', { target: { value: '' } });
    expect(onFilterMock.mock.calls[0][0]).toBeNull();
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <TableFilterCell {...defaultProps}>
        <span className="test" />
      </TableFilterCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableFilterCell {...defaultProps} className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableFilterCell {...defaultProps} data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should render disabled filtering editor if filtering is not allowed', () => {
    const tree = shallow((
      <TableFilterCell {...defaultProps} filteringEnabled={false} />
    ));

    expect(tree.find(Input).prop('disabled'))
      .toBeTruthy();
  });
});
