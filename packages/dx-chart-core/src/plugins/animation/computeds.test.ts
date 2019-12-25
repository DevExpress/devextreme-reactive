import {
  getDelay, easeOutCubic, getStartVal, getPathStart, getPointStart, getPieStart,
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

  it('#getPathStart', () => {
    const scale = () => 4;
    scale.copy = () => scale;
    scale.clamp = () => scale;
    const scales = { valScale: scale };
    expect(getPathStart(scales as any, { coordinates: [{ arg: 5, val: 5, startVal: 10 }] } as any))
    .toEqual({ coordinates: [{ arg: 5, val: 4, startVal: 4 }] });
  });

  it('#getPointStart', () => {
    const scale = () => 4;
    scale.copy = () => scale;
    scale.clamp = () => scale;
    const scales = { valScale: scale };
    expect(getPointStart(scales as any, { arg: 5, val: 5, startVal: 10 } as any))
    .toEqual({ arg: 5, val: 4, startVal: 4 });
  });

  it('#getPieStart', () => {
    expect(getPieStart(undefined, { startAngle: 2, endAngle: 4 } as any))
    .toEqual({ startAngle: 2, endAngle: 4, innerRadius: 0, outerRadius: 0 });
  });
});
