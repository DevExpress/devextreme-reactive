import { keyframes } from 'styled-components';
import {
  getAnimationStyles,
  mergeExtensionsWithDefault,
} from './computeds';

jest.mock('styled-components', () => ({
  keyframes: jest.fn(),
}));

describe('#getAnimationStyles', () => {
  beforeAll(() => {
    keyframes.mockImplementation(() => 'keyframes');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should return proper styles', () => {
    const object = { keyframes: 'keyframes', options: 'options', styles: { extraStyle: 'style' } };
    expect(getAnimationStyles(object)).toEqual({
      animation: 'keyframes options', extraStyle: 'style',
    });
  });
});

describe('#mergeExtensionsWithDefault', () => {
  it('should return proper extensions', () => {
    expect(mergeExtensionsWithDefault([{ animation1: () => {} }, { animation2: () => {} }]))
      .toEqual([
        { animation1: expect.any(Function) },
        { animation2: expect.any(Function) },
        { transform: expect.any(Function) },
        { translate: expect.any(Function) },
        { pie: expect.any(Function) },
      ]);
  });
});
