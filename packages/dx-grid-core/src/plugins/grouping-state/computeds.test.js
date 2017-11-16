import {
  draftGrouping,
} from './computeds';
import { GROUP_ADD_MODE, GROUP_REMOVE_MODE, GROUP_REORDER_MODE } from './constants';

describe('GroupingPlugin computeds', () => {
  describe('#draftGrouping', () => {
    it('can add draft column to draftGrouping', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'c' },
      ];
      const processedGrouping = draftGrouping(grouping, { columnName: 'b', groupIndex: 1 });

      expect(processedGrouping)
        .toEqual([
          { columnName: 'a' },
          { columnName: 'b', draft: GROUP_ADD_MODE },
          { columnName: 'c' },
        ]);
    });

    it('can reset draftGrouping', () => {
      const grouping = [{ columnName: 'a' }];

      expect(draftGrouping(grouping, null))
        .toEqual([
          { columnName: 'a' },
        ]);
    });

    it('can mark a column as draft in draftGrouping', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'b' },
      ];

      expect(draftGrouping(grouping, { columnName: 'a', groupIndex: -1 }))
        .toEqual([
          { columnName: 'a', draft: GROUP_REMOVE_MODE },
          { columnName: 'b' },
        ]);
      expect(draftGrouping(grouping, { columnName: 'b', groupIndex: -1 }))
        .toEqual([
          { columnName: 'a' },
          { columnName: 'b', draft: GROUP_REMOVE_MODE },
        ]);
    });

    it('can change grouping order', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'b' },
      ];

      expect(draftGrouping(grouping, { columnName: 'a', groupIndex: 1 }))
        .toEqual([
          { columnName: 'b' },
          { columnName: 'a', draft: GROUP_REORDER_MODE },
        ]);
    });
  });
});
