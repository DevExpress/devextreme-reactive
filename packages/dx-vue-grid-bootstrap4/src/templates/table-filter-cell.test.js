import { shallow } from '@vue/test-utils';
import { TableFilterCell } from './table-filter-cell';

describe('TableFilterCell', () => {
  it('should not set filter with an empty value', () => {
    const onFilterMock = jest.fn();
    const tree = shallow({
      render() {
        return (
          <TableFilterCell
            column={{
              name: 'Test',
            }}
            onFilter={onFilterMock}
            value="abc"
          />
        );
      },
    });

    const input = tree.find('input');
    input.element.value = '';
    input.trigger('input');
    expect(onFilterMock.mock.calls[0][0]).toBeNull();
  });

  it('should render children if passed', () => {
    const tree = shallow({
      render() {
        return (
          <TableFilterCell>
            <span class="test" />
          </TableFilterCell>
        );
      },
    });

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow({
      render() {
        return (
          <TableFilterCell class="custom-class" />
        );
      },
    });

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow({
      render() {
        return (
          <TableFilterCell data="abc" />
        );
      },
    });
    expect(tree.attributes().data)
      .toBe('abc');
  });

  it('should render readonly filtering editor if filtering is not allowed', () => {
    const tree = shallow({
      render() {
        return (
          <TableFilterCell filteringEnabled={false} getMessage={key => key} />
        );
      },
    });

    expect(tree.find('input').attributes().readonly)
      .toBeTruthy();
  });
});

