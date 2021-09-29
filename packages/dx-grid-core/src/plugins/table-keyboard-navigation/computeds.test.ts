import {
    getFocusing,
} from './computeds';

describe('#getFocusing', () => {
  const tableBodyRows = [
      { key: 'test_row_1', rowId: 1 },
      { key: 'test_row_2', rowId: 2 },
      { key: 'test_row_3', rowId: 3 },
  ] as any;
  it('should return correct id', () => {
    expect(getFocusing(tableBodyRows, { rowKey: 'test_row_2' } as any)).toEqual([2]);
    expect(getFocusing(tableBodyRows)).toEqual([]);
    expect(getFocusing(tableBodyRows, { rowKey: 'header' } as any)).toEqual([]);
  });
});
