import { shallow } from '@vue/test-utils';
import { TableFilterCell } from './table-filter-cell';

describe('TableFilterCell', () => {
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
          <TableFilterCell data="abc" />
        );
      },
    });
    expect(tree.attributes().data)
      .toBe('abc');
  });
});
