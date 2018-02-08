import * as React from 'react';
import { createShallow, getClasses } from 'material-ui/test-utils';
import Input from 'material-ui/Input';
import { TableFilterCell } from './table-filter-cell';

describe('TableFilterCell', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TableFilterCell getMessage={key => key} />);
  });

  it('can use filter placeholder', () => {
    const tree = shallow((
      <TableFilterCell
        column={{
          name: 'Test',
        }}
        getMessage={key => key}
      />
    ));

    expect(tree.find(Input).prop('placeholder')).toBe('filterPlaceholder');
  });

  it('should not set filter with an empty value', () => {
    const onFilterMock = jest.fn();
    const tree = shallow((
      <TableFilterCell
        column={{
          name: 'Test',
        }}
        onFilter={onFilterMock}
        getMessage={key => key}
        value="abc"
      />
    ));

    tree.find(Input).simulate('change', { target: { value: '' } });
    expect(onFilterMock.mock.calls[0][0]).toBeNull();
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <TableFilterCell getMessage={key => key}>
        <span className="test" />
      </TableFilterCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableFilterCell className="custom-class" getMessage={key => key} />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableFilterCell data={{ a: 1 }} getMessage={key => key} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should render disabled filtering editor if filtering is not allowed', () => {
    const tree = shallow((
      <TableFilterCell filteringEnabled={false} getMessage={key => key} />
    ));

    expect(tree.find(Input).prop('disabled'))
      .toBeTruthy();
  });
});
