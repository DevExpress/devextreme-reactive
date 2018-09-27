import { prepareData } from './computeds';

describe('Prepare data', () => {
  it('should return as is', () => {
    const data = [{ arg: 1, val1: 3, val2: 4 }, { arg: 1.5 }, { arg: 2, val1: 5, val2: 6 }];
    expect(prepareData(data, null)).toEqual(data);
  });

  it('should perform function passed to prepareData', () => {
    expect(prepareData([], [], jest.fn(() => 'preparedData'))).toBe('preparedData');
  });
});
