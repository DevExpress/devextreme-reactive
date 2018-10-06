import keyframes from 'jss-keyframes';
import {
  getAnimation,
  mergeExtensionsWithDefault,
} from './computeds';

jest.mock('jss-keyframes');

describe('#getAnimation', () => {
  beforeAll(() => {
    keyframes.mockImplementation(() => 'keyframes');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should return proper styles', () => {
    const extensions = [{ name: 'animationName', keyframes: () => 'keyframes', options: () => 'options' }];
    expect(getAnimation({ x: 1, y: 2 }, extensions)('animationName')()).toEqual({
      animation: 'keyframes options',
    });
  });
});

describe('#mergeExtensionsWithDefault', () => {
  it('should return proper extensions', () => {
    expect(mergeExtensionsWithDefault([
      {
        name: 'animation', options: jest.fn(), styles: jest.fn(), keyframes: jest.fn(),
      },
    ]))
      .toEqual([
        {
          name: 'animation', options: expect.any(Function), styles: expect.any(Function), keyframes: expect.any(Function),
        },
        {
          name: 'transform', options: expect.any(Function), styles: expect.any(Function), keyframes: expect.any(Function),
        },
        {
          name: 'opacity', options: expect.any(Function), keyframes: expect.any(Function),
        },
        {
          name: 'transformPie', options: expect.any(Function), keyframes: expect.any(Function),
        },
      ]);
  });
});
