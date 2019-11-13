import {
  TABLE_TOTAL_SUMMARY_TYPE, TABLE_GROUP_SUMMARY_TYPE, TABLE_TREE_SUMMARY_TYPE,
} from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import {
  isGroupSummaryTableCell,
  isTotalSummaryTableCell,
  isTreeSummaryTableCell,
  isGroupSummaryTableRow,
  isTotalSummaryTableRow,
  isTreeSummaryTableRow,
  getColumnSummaries,
  isInlineGroupSummary,
  getGroupInlineSummaries,
  isInlineGroupCaptionSummary,
} from './helpers';

describe('TableSummaryRow Plugin helpers', () => {
  describe('#isGroupSummaryTableCell', () => {
    it('should work', () => {
      expect(isGroupSummaryTableCell({ type: TABLE_GROUP_SUMMARY_TYPE }, { type: TABLE_DATA_TYPE }))
        .toBeTruthy();
      expect(isGroupSummaryTableCell({ type: 'undefined' }, { type: TABLE_DATA_TYPE }))
        .toBeFalsy();
      expect(isGroupSummaryTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });

  describe('#isTotalSummaryTableCell', () => {
    it('should work', () => {
      expect(isTotalSummaryTableCell({ type: TABLE_TOTAL_SUMMARY_TYPE }, { type: TABLE_DATA_TYPE }))
        .toBeTruthy();
      expect(isTotalSummaryTableCell({ type: 'undefined' }, { type: TABLE_DATA_TYPE }))
        .toBeFalsy();
      expect(isTotalSummaryTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });

  describe('#isTreeSummaryTableCell', () => {
    it('should work', () => {
      expect(isTreeSummaryTableCell({ type: TABLE_TREE_SUMMARY_TYPE }, { type: TABLE_DATA_TYPE }))
        .toBeTruthy();
      expect(isTreeSummaryTableCell({ type: 'undefined' }, { type: TABLE_DATA_TYPE }))
        .toBeFalsy();
      expect(isTreeSummaryTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });

  describe('#isGroupSummaryTableRow', () => {
    it('should work', () => {
      expect(isGroupSummaryTableRow({ type: TABLE_GROUP_SUMMARY_TYPE }))
        .toBeTruthy();
      expect(isGroupSummaryTableRow({ type: 'undefined' }))
        .toBeFalsy();
    });
  });

  describe('#isTotalSummaryTableRow', () => {
    it('should work', () => {
      expect(isTotalSummaryTableRow({ type: TABLE_TOTAL_SUMMARY_TYPE }))
        .toBeTruthy();
      expect(isTotalSummaryTableRow({ type: 'undefined' }))
        .toBeFalsy();
    });
  });

  describe('#isTreeSummaryTableRow', () => {
    it('should work', () => {
      expect(isTreeSummaryTableRow({ type: TABLE_TREE_SUMMARY_TYPE }))
        .toBeTruthy();
      expect(isTreeSummaryTableRow({ type: 'undefined' }))
        .toBeFalsy();
    });
  });

  describe('#isInlineGroupSummary', () => {
    it('should work', () => {
      expect(isInlineGroupSummary({ type: 'avg' }))
        .toBeFalsy();
      expect(isInlineGroupSummary({ type: 'avg', showInGroupCaption: true }))
        .toBeTruthy();
      expect(isInlineGroupSummary({ type: 'avg', showInGroupRow: true }))
        .toBeTruthy();
    });
  });

  describe('#isInlineGroupCaptionSummary', () => {
    it('should work', () => {
      expect(isInlineGroupCaptionSummary({ type: 'avg' }))
        .toBeFalsy();
      expect(isInlineGroupCaptionSummary({ type: 'avg', showInGroupCaption: true }))
        .toBeTruthy();
    });
  });

  describe('#getGroupInlineSummaries', () => {
    const columns = ['a', 'b', 'c'].map(name => ({ name }));

    it('should return an empty array if no inline summaries exist', () => {
      const summaryItems = [
        { columnName: 'a', type: 'min' },
        { columnName: 'b', type: 'max' },
      ];
      expect(getGroupInlineSummaries(summaryItems, columns, [11, 17]))
        .toEqual([]);
    });

    it('should return correct inline summaries', () => {
      const summaryItems = [
        { columnName: 'a', type: 'min' },
        { columnName: 'b', type: 'max', showInGroupRow: true },
        { columnName: 'b', type: 'count', showInGroupCaption: true },
        { columnName: 'b', type: 'sum', showInGroupCaption: true },
        { columnName: 'c', type: 'avg', showInGroupCaption: true },
      ];
      expect(getGroupInlineSummaries(summaryItems, columns, [11, 17, 3, 51, 5]))
        .toMatchObject([
          {
            column: { name: 'b' },
            summaries: [
              { type: 'count', value: 3 },
              { type: 'sum', value: 51 },
            ],
          },
          {
            column: { name: 'c' },
            summaries: [
              { type: 'avg', value: 5 },
            ],
          },
        ]);
    });
  });

  describe('#getColumnSummaries', () => {
    it('should work', () => {
      expect(getColumnSummaries(
        [
          { columnName: 'a', type: 'count' },
          { columnName: 'b', type: 'max' },
          { columnName: 'a', type: 'min' },
        ],
        'a',
        [1, 2, 1],
      )).toEqual([{ type: 'count', value: 1 }, { type: 'min', value: 1 }]);
    });
  });
});
