import { getViewType } from './helpers';
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
