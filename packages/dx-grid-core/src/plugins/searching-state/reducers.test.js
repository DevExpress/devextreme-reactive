import { changeSearchValue } from './reducers';

describe('SearchingState reducer', () => {
  it('should return new searchValue', () => {
    expect(changeSearchValue('default', { searchValue: 'searchValue' }))
      .toBe('searchValue');
  });
});
