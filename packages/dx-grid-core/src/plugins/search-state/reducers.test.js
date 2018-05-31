import { changeSearchValue } from './reducers';

describe('SearchState reducers', () => {
  describe('#changeSearchValue', () => {
    it('should return new searchValue', () => {
      expect(changeSearchValue('default', 'searchValue'))
        .toBe('searchValue');
    });
  });
});
