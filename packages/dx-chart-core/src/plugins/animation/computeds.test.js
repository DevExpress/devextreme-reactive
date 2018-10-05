import keyframes from 'jss-keyframes';
import {
  getAnimationStyles,
  mergeExtensionsWithDefault,
} from './computeds';

jest.mock('jss-keyframes');

describe('#getAnimationStyles', () => {
  beforeAll(() => {
    keyframes.mockImplementation(() => 'keyframes');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should return proper styles', () => {
    const object = { keyframes: 'keyframes', options: 'options' };
    expect(getAnimationStyles(object)).toEqual({
      animation: 'keyframes options',
    });
  });
});

describe('#mergeExtensionsWithDefault', () => {
  it('should return proper extensions', () => {
    expect(mergeExtensionsWithDefault([
      { name: 'animation1', settings: () => {} },
      { name: 'animation2', settings: () => {} },
    ]))
      .toEqual([
        { name: 'animation1', settings: expect.any(Function) },
        { name: 'animation2', settings: expect.any(Function) },
        { name: 'transform', settings: expect.any(Function) },
        { name: 'translate', settings: expect.any(Function) },
        { name: 'transformPie', settings: expect.any(Function) },
      ]);
  });
});
