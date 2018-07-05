import { shallow } from '@vue/test-utils';
import { TableTreeContent } from './table-tree-content';

describe('TableTreeContent', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow({
      render() {
        return (
          <TableTreeContent>
            <span class="custom-class" />
          </TableTreeContent>
        );
      },
    });

    expect(tree.find('.custom-class').exists())
      .toBeTruthy();
  });
});
