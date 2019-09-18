import {
  getDelay, easeOutCubic, buildAnimation, getStartY, getStartCoordinates,
} from './computeds';

describe('Animation', () => {
  it('#getDelay', () => {
    expect(getDelay(1, true)).toBe(30);
    expect(getDelay(2, false)).toBe(0);
  });

  it('#easeOutCubic', () => {
    expect(easeOutCubic(0.5)).toBe(0.875);
  });

  it('should run animation', () => {
    const easing = jest.fn(value => value);
    const duration = 10;
    const processAnimation = jest.fn().mockReturnValue(() => 'processedAnimation');
    const setAttributes = jest.fn();
    const animation = buildAnimation(easing, duration)(
      'startCoords', 'endCoords', processAnimation, setAttributes,
    );
    expect(animation).toBeTruthy();
    expect(animation.update).toBeTruthy();
    expect(processAnimation).toBeCalledWith('startCoords', 'endCoords');
  });

  it('should update animation', () => {
    const easing = jest.fn(value => value);
    const duration = 10;
    const processAnimation = jest.fn().mockReturnValue(() => 'processedAnimation');
    const setAttributes = jest.fn();
    const animation = buildAnimation(easing, duration)(
      'startCoords', 'endCoords', processAnimation, setAttributes,
    );
    animation.update('updatedStartCoords', 'updatedEndCoords');
    expect(processAnimation).toBeCalledWith('updatedStartCoords', 'updatedEndCoords');
  });

  it('#getStartY', () => {
    const scale = () => 4;
    scale.copy = () => scale;
    scale.clamp = () => scale;
    const scales = { valScale: scale };
    expect(getStartY(scales as any)).toBe(4);
  });

  it('#getStartCoordinates', () => {
    const scale = () => 4;
    scale.copy = () => scale;
    scale.clamp = () => scale;
    const scales = { valScale: scale };
    expect(getStartCoordinates(scales as any, [{ arg: 5, val: 5, startVal: 10 }] as any))
    .toEqual([{ arg: 5, val: 4, startVal: 4 }]);
  });
});
