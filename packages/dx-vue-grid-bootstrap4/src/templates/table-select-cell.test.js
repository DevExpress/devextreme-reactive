import { shallow } from '@vue/test-utils';
import { TableSelectCell } from './table-select-cell';

describe('TableSelectCell', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow({
      render() {
        return (
          <TableSelectCell
            class="custom-class"
            onToggle={() => undefined}
          />
        );
      },
    });

    expect(tree.classes()).toContain('custom-class');
  });
});
