import { createScale } from '../../utils/scale';
import { xyScales } from './computeds';

jest.mock('../../utils/scale', () => ({
  createScale: jest.fn(),
}));

describe('xyScales', () => {
  beforeAll(() => {
    createScale.mockImplementation(() => jest.fn());
  });

  it('get xyScales', () => {
    const scales = xyScales(
      { axisName: 'name', domain: 'domain' },
      'axisName',
      'domain',
      20,
      10,
    );

    expect(createScale).toHaveBeenCalledTimes(2);
    expect(createScale.mock.calls[0]).toEqual(['name', 20, 10]);
    expect(createScale.mock.calls[1]).toEqual(['domain', 20, 10]);
    expect(scales.xScale).toBeTruthy();
    expect(scales.yScale).toBeTruthy();
  });
});
