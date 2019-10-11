import { getViewType, isMidnight } from './helpers';
import { VERTICAL_TYPE, HORIZONTAL_TYPE } from '../../constants';

describe('#getViewType', () => {
  it('should work with horizontal type', () => {
    expect(getViewType('month'))
      .toEqual(HORIZONTAL_TYPE);
  });

  it('should work with vertical type', () => {
    expect(getViewType('day'))
      .toEqual(VERTICAL_TYPE);
  });
});

describe('#isMidnight', () => {
  it('should return true if time is midnight', () => {
    expect(isMidnight(new Date(2019, 5, 5, 0, 0)))
      .toBeTruthy();
  });

  it('should return false otherwise', () => {
    expect(isMidnight(new Date(2019, 5, 5, 0, 1)))
      .toBeFalsy();
  });
});
