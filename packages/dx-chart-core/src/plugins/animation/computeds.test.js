import {
  getAreaAnimationStyle,
  getPieAnimationStyle,
  getScatterAnimationStyle,
  buildAnimatedStyleGetter,
} from './computeds';

describe('Animation styles', () => {
  const { head } = document; // eslint-disable-line no-undef

  afterEach(() => {
    const style = head.getElementsByTagName('style')[0];
    head.removeChild(style);
  });

  describe('#getAreaAnimationStyle', () => {
    const yScale = () => 4;
    yScale.copy = () => yScale;
    yScale.clamp = () => yScale;

    it('should return style', () => {
      expect(getAreaAnimationStyle({ yScale }, null, 'test-point', 'test-series-name')).toEqual({
        animation: 'animation_transform 1s',
        transformOrigin: '0px 4px',
      });
    });

    it('should apply custom options', () => {
      const getOptions = jest.fn().mockReturnValue('test-options');
      expect(getAreaAnimationStyle({ yScale }, getOptions, 'test-point', 'test-series-name'))
        .toEqual({
          animation: 'animation_transform test-options',
          transformOrigin: '0px 4px',
        });
      expect(getOptions).toBeCalledWith('test-point', 'test-series-name');
    });
  });

  describe('#getPieAnimationStyle', () => {
    it('should return style', () => {
      expect(getPieAnimationStyle({}, null, { index: 3 }, 'test-series-name')).toEqual({
        animation: 'animation_pie 0.8s',
      });
    });
  });

  describe('#getScatterAnimationStyle', () => {
    it('should return style', () => {
      expect(getScatterAnimationStyle({}, null, 'test-point', 'test-series-name')).toEqual({
        animation: 'animation_scatter 1s',
      });
    });
  });

  describe('style element generation', () => {
    it('should reuse single "style" element', () => {
      getScatterAnimationStyle({}, null, 'test-point', 'test-series-name');
      getScatterAnimationStyle({}, null, 'test-point', 'test-series-name');

      expect(head.getElementsByTagName('style').length).toEqual(1);
      expect(head.getElementsByTagName('style')[0].textContent).toEqual(
        '\n@keyframes animation_scatter { 0% { opacity: 0; } 50% { opacity: 0; } 100% { opacity: 1 } }\n',
      );
    });
  });
});

describe('#buildAnimatedStyleGetter', () => {
  it('should create function', () => {
    const getCustomOptions = jest.fn();
    const getStyle = buildAnimatedStyleGetter(getCustomOptions);
    const getAnimationStyle = jest.fn().mockReturnValue({ animation: 'test' });

    expect(getStyle(
      { style: 'base' }, getAnimationStyle, 'test-scales', 'test-point', 'test-series-name',
    )).toEqual({
      style: 'base',
      animation: 'test',
    });
    expect(getAnimationStyle)
      .toBeCalledWith('test-scales', getCustomOptions, 'test-point', 'test-series-name');
  });
});
