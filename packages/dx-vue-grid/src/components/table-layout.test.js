import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableLayout } from './table-layout';

jest.mock('@devexpress/dx-grid-core', () => ({
  TABLE_FLEX_TYPE: 'flex',
}));

const defaultProps = {
  layoutComponent: { name: 'Layout', render() { return null; } },
};

describe('TableLayout', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
  });

  afterEach(() => {
    resetConsole();
    jest.clearAllMocks();
  });

  describe('flex column', () => {
    it('should add flex column if all columns have fixed widths', () => {
      const columns = [
        { key: 'a', column: { name: 'a' }, width: 100 },
        { key: 'b', column: { name: 'b' }, width: 100 },
      ];

      const tree = shallow({
        render() {
          return (
            <TableLayout
              {...{ attrs: { ...defaultProps } }}
              columns={columns}
              minColumnWidth={100}
            />
          );
        },
      });

      expect(tree.find(defaultProps.layoutComponent).vm.$attrs)
        .toMatchObject({
          minWidth: 200,
          columns: [
            ...columns,
            { key: 'flex', type: 'flex' },
          ],
        });
    });
  });
});
