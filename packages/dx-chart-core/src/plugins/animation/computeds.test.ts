import {
  getDelay, easeOutCubic, getStartVal, getStartCoordinates,
} from './computeds';

describe('Animation', () => {
  it('#getDelay', () => {
    expect(getDelay(1, true)).toBe(30);
    expect(getDelay(2, false)).toBe(0);
  });

  it('#easeOutCubic', () => {
    expect(easeOutCubic(0.5)).toBe(0.875);
  });

  it('#getStartVal', () => {
    const scale = () => 4;
    scale.copy = () => scale;
    scale.clamp = () => scale;
    const scales = { valScale: scale };
    expect(getStartVal(scales as any)).toBe(4);
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
