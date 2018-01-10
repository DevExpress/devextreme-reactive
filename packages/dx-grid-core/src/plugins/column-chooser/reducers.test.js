import { toggleColumn } from './reducers';

describe('#toggleColumn', () => {
  it('should change selected columns correctly', () => {
    expect(toggleColumn(['a', 'b'], 'c'))
      .toEqual(['a', 'b', 'c']);
    expect(toggleColumn(['a', 'b', 'c'], 'c'))
      .toEqual(['a', 'b']);
  });
});
