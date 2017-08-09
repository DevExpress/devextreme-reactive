import { getColumnByName } from './columns';

describe('getColumnByName', () => {
  it('should work', () => {
    const columns = [
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
    ];
    expect(getColumnByName(columns, 'b')).toBe(columns[1]);
  });
});
