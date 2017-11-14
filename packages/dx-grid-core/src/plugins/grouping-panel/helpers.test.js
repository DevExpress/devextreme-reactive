import {
  groupingPanelItems,
} from './helpers';

describe('Plugin helpers', () => {
  describe('#groupingPanelItems', () => {
    const columns = [
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
      { name: 'd' },
    ];
    const draftGrouping = [
      { columnName: 'a' },
      { columnName: 'c', dndProp: true },
    ];

    it('should work', () => {
      const processedColumns = groupingPanelItems(columns, draftGrouping);

      expect(processedColumns).toHaveLength(2);
      expect(processedColumns[0].column).toBe(columns[0]);
      expect(processedColumns[0].dndProp).toBeUndefined();
      expect(processedColumns[1].column).toBe(columns[2]);
      expect(processedColumns[1].dndProp).toBeTruthy();
    });
  });
});
