import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectRow } from './table-select-row';

describe('Table Select Row', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should have correct class', () => {
    let tree = shallow({
      render() {
        return (
          <TableSelectRow />
        );
      },
    });
    expect(tree.find('tr').classes()).not.toContain('table-active');

    tree = shallow({
      render() {
        return (
          <TableSelectRow
            selected
          />
        );
      },
    });
    expect(tree.find('tr').classes()).toContain('table-active');
  });

  it('should handle row click', () => {
    const onToggleMock = jest.fn();
    const tree = shallow({
      render() {
        return (
          <TableSelectRow
            onToggle={onToggleMock}
            selectByRowClick
          />
        );
      },
    });

    tree.find('tr').trigger('click');
    expect(onToggleMock).toBeCalled();
  });
});
