import {
  getAreaAnimationStyle,
  getPieAnimationStyle,
  getScatterAnimationStyle,
  buildAnimatedStyleGetter,
} from './computeds';

describe('Animation styles', () => {
  const { head } = document;

  afterEach(() => {
    const style = head.getElementsByTagName('style')[0];
    head.removeChild(style);
  });

  describe('#getAreaAnimationStyle', () => {
    const yScale = () => 4;
    yScale.copy = () => yScale;
    yScale.clamp = () => yScale;

    it('should return style', () => {
      expect(getAreaAnimationStyle({ yScale } as any)).toEqual({
        animation: 'animation_transform 1s',
        transformOrigin: '0px 4px',
      });
    });
  });

  describe('#getPieAnimationStyle', () => {
    it('should return style', () => {
      expect(getPieAnimationStyle({} as any, { index: 3 } as any)).toEqual({
        animation: 'animation_pie 1s',
      });
    });
  });

  describe('#getScatterAnimationStyle', () => {
    it('should return style', () => {
      expect(getScatterAnimationStyle({} as any)).toEqual({
        animation: 'animation_scatter 1s',
      });
    });
  });

  describe('style element generation', () => {
    it('should reuse single "style" element', () => {
      getScatterAnimationStyle({} as any);
      getScatterAnimationStyle({} as any);

      expect(head.getElementsByTagName('style').length).toEqual(1);
      expect(head.getElementsByTagName('style')[0].textContent).toEqual(
        // tslint:disable-next-line: max-line-length
        '\n@keyframes animation_scatter { 0% { opacity: 0; } 50% { opacity: 0; } 100% { opacity: 1 } }\n',
      );
    });
  });
});

describe('#buildAnimatedStyleGetter', () => {
  it('should create function', () => {
    const getAnimationStyle = jest.fn().mockReturnValue({ animation: 'test' });

    expect(buildAnimatedStyleGetter(
      { style: 'base' }, getAnimationStyle, 'test-scales' as any, 'test-point' as any,
    )).toEqual({
      style: 'base',
      animation: 'test',
    });
    expect(getAnimationStyle)
      .toBeCalledWith('test-scales', 'test-point');
  });
});
