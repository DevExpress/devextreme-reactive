import { groupingPanelItems } from './helpers';

describe('Plugin helpers', () => {
  describe('#groupingPanelItems', () => {
    const columns = [
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
      { name: 'd' },
    ];

    it('should work with normal conditions', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'c' },
      ];
      const draftGrouping = [
        { columnName: 'a' },
        { columnName: 'c' },
      ];

      expect(groupingPanelItems(columns, grouping, draftGrouping))
        .toEqual([
          { column: { name: 'a' }, draft: false },
          { column: { name: 'c' }, draft: false },
        ]);
    });

    it('should work when draft group added', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'c' },
      ];
      const draftGrouping = [
        { columnName: 'a' },
        { columnName: 'c' },
        { columnName: 'd' },
      ];

      expect(groupingPanelItems(columns, grouping, draftGrouping))
        .toEqual([
          { column: { name: 'a' }, draft: false },
          { column: { name: 'c' }, draft: false },
          { column: { name: 'd' }, draft: true },
        ]);
    });

    it('should work when draft group removed', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'c' },
      ];
      const draftGrouping = [
        { columnName: 'a' },
      ];

      expect(groupingPanelItems(columns, grouping, draftGrouping))
        .toEqual([
          { column: { name: 'a' }, draft: false },
          { column: { name: 'c' }, draft: true },
        ]);
    });
  });
});
