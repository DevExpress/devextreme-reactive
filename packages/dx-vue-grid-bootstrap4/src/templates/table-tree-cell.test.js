import { shallow } from '@vue/test-utils';
import { TableTreeCell } from './table-tree-cell';

describe('TableTreeCell', () => {
  it('should render children if passed', () => {
    const tree = shallow({
      render() {
        return (
          <TableTreeCell>
            <span class="test" />
          </TableTreeCell>
        );
      },
    });

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });
});
