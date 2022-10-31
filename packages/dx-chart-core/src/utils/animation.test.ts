import {
  buildAnimation, processPointAnimation,
  processBarAnimation, processLineAnimation, processAreaAnimation, processPieAnimation,
} from './animation';

describe.skip('build animation', () => {
  let  requestAnimationFrame;
  let cancelAnimationFrame;
  const easing = jest.fn(value => value);
  const duration = 3;
  const processAnimation = jest.fn().mockReturnValue(() => 'processedAnimation');
  const setAttributes = jest.fn();
  beforeEach(() => {
    requestAnimationFrame = jest.spyOn(window, 'requestAnimationFrame')
    .mockImplementation(time => time(0) as any);
    cancelAnimationFrame = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation();
  });

  afterEach(() => {
    requestAnimationFrame.mockRestore();
    cancelAnimationFrame.mockRestore();
    jest.clearAllMocks();
  });

  jest.useFakeTimers();

  it('should run animation', () => {
    const animation = buildAnimation(easing, duration)(
      'startCoords', 'endCoords', processAnimation, setAttributes,
    );
    jest.runAllTimers();
    expect(animation).toBeTruthy();
    expect(animation.update).toBeTruthy();
    expect(animation.stop).toBeTruthy();
    expect(processAnimation).toBeCalledWith('startCoords', 'endCoords');
    expect(easing).toHaveBeenLastCalledWith(1);
    expect(setAttributes).toHaveBeenLastCalledWith('processedAnimation');
    expect(requestAnimationFrame).toBeCalled();
  });

  it('should update animation', () => {
    const animation = buildAnimation(easing, duration)(
      'startCoords', 'endCoords', processAnimation, setAttributes, 10,
    );
    processAnimation.mockClear();
    jest.runAllTimers();
    animation.update('updatedStartCoords', 'updatedEndCoords', 0);
    expect(processAnimation).toBeCalledWith('updatedStartCoords', 'updatedEndCoords');
    expect(cancelAnimationFrame).toBeCalled();
    expect(requestAnimationFrame).toBeCalled();
  });

  it('should stop animation', () => {
    const animation = buildAnimation(easing, duration)(
      'startCoords', 'endCoords', processAnimation, setAttributes,
    );
    jest.runAllTimers();
    animation.stop();
    animation.stop();
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
  });
});

describe('process animation', () => {
  it('#processPointAnimation', () => {
    const start = { arg: 2, val: 3 };
    const end = { arg: 5, val: 6 };
    const processAnimation = processPointAnimation(start, end);
    expect(processAnimation(0)).toEqual({ arg: 2, val: 3 });
    expect(processAnimation(0.2)).toEqual({ arg: 2.6, val: 3.6 });
    expect(processAnimation(0.5)).toEqual({ arg: 3.5, val: 4.5 });
    expect(processAnimation(1)).toEqual({ arg: 5, val: 6 });
  });

  it('#processBarAnimation', () => {
    const start = { arg: 2, val: 3, startVal: 1 };
    const end = { arg: 5, val: 6, startVal: 2 };
    const processAnimation = processBarAnimation(start, end);
    expect(processAnimation(0)).toEqual({ arg: 2, val: 3, startVal: 1 });
    expect(processAnimation(0.2)).toEqual({ arg: 2.6, val: 3.6, startVal: 1.2 });
    expect(processAnimation(0.5)).toEqual({ arg: 3.5, val: 4.5, startVal: 1.5 });
    expect(processAnimation(1)).toEqual({ arg: 5, val: 6, startVal: 2 });
  });

  it('#processLineAnimation', () => {
    const start = { coordinates: [{ arg: 2, val: 3 }] };
    const end = { coordinates: [{ arg: 5, val: 6, extraProps: 'extraTestProps' }] };
    const processAnimation = processLineAnimation(start as any, end as any);
    expect(processAnimation(0)).toEqual({ coordinates: [{ arg: 2, val: 3, extraProps: 'extraTestProps' }] });
    expect(processAnimation(0.2)).toEqual({ coordinates: [{ arg: 2.6, val: 3.6, extraProps: 'extraTestProps' }] });
    expect(processAnimation(0.5)).toEqual({ coordinates: [{ arg: 3.5, val: 4.5, extraProps: 'extraTestProps' }] });
    expect(processAnimation(1)).toEqual({ coordinates: [{ arg: 5, val: 6, extraProps: 'extraTestProps' }] });
  });

  it('#processAreaAnimation', () => {
    const start = { coordinates: [{ arg: 2, val: 3, startVal: 1 }] };
    const end = { coordinates:[{ arg: 5, val: 6, startVal: 2, extraProps: 'extraTestProps' }] };
    const processAnimation = processAreaAnimation(start as any, end as any);
    expect(processAnimation(0)).toEqual({ coordinates: [{ arg: 2, val: 3, startVal: 1, extraProps: 'extraTestProps' }] });
    expect(processAnimation(0.2))
    .toEqual({ coordinates: [{
      arg: 2.6, val: 3.6, startVal: 1.2, extraProps: 'extraTestProps',
    }] });
    expect(processAnimation(0.5))
    .toEqual({ coordinates: [{
      arg: 3.5, val: 4.5, startVal: 1.5, extraProps: 'extraTestProps',
    }] });
    expect(processAnimation(1)).toEqual({ coordinates: [{ arg: 5, val: 6, startVal: 2, extraProps: 'extraTestProps' }] });
  });

  it('#processPieAnimation', () => {
    const start = { innerRadius: 2, outerRadius: 6, startAngle: 10, endAngle: 15 };
    const end = { innerRadius: 5, outerRadius: 11, startAngle: 16, endAngle: 25 };
    const processAnimation = processPieAnimation(start as any, end as any);
    expect(processAnimation(0))
    .toEqual({ innerRadius: 2, outerRadius: 6, startAngle: 10, endAngle: 15 });
    expect(processAnimation(0.2))
    .toEqual({ innerRadius: 2.6, outerRadius: 7, startAngle: 11.2, endAngle: 17 });
    expect(processAnimation(0.5))
    .toEqual({ innerRadius: 3.5, outerRadius: 8.5, startAngle: 13, endAngle: 20 });
    expect(processAnimation(1))
    .toEqual({ innerRadius: 5, outerRadius: 11, startAngle: 16, endAngle: 25 });
  });
});
