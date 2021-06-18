import { isReadyToRenderSeries } from './computeds';

describe('#isReadyToRenderSeries', () => {
  const divRef = { current: { getBoundingClientRect: () => ({ width: 300, height: 400 }) } };
  it('should return false, pane size is zero', () => {
    const pane = { width: 0, height: 0 };
    expect(isReadyToRenderSeries({ pane }, { current: {} }, false, false))
      .toBe(false);
  });

  it('should return false, div size is not equal size of elements inside', () => {
    const pane = { width: 230, height: 340 };
    const leftElement = { width: 2, height: 3 };
    const bottomElement = { width: 3, height: 4 };

    expect(isReadyToRenderSeries({ pane }, divRef, false, false))
      .toBe(false);
    expect(isReadyToRenderSeries({
      pane,
      'left-element': leftElement, 'bottom-element': bottomElement,
    }, divRef, false, false)).toBe(false);
  });

  it('should return true, div size is equal size of elements inside', () => {
    const leftElement = { width: 70, height: 3 };
    const bottomElement = { width: 3, height: 60 };

    expect(isReadyToRenderSeries({ pane: { width: 300, height: 400 } }, divRef, false, false))
      .toBe(true);
    expect(isReadyToRenderSeries({
      pane: { width: 230, height: 340 },
      'left-element': leftElement, 'bottom-element': bottomElement,
    }, divRef, false, false)).toBe(true);
  });

  it('should return true, #3194', () => {
    const leftElement = { width: 70, height: 3 };
    const bottomElement = { width: 3, height: 60 };

    expect(isReadyToRenderSeries({
      pane: { width: 230, height: 340 },
      'left-bottom': leftElement, 'bottom-right': bottomElement,
    }, divRef, false, false)).toBe(true);
  });

  it('should return false if the div size is equal to the size of the elements inside but previous data is empty and axes exist', () => {
    expect(isReadyToRenderSeries({ pane: { width: 300, height: 400 } }, divRef, true, true))
      .toBe(false);
  });

  it('should return true if the div size is equal to the size of the elements inside and previous data is empty but axes do not exist', () => {
    expect(isReadyToRenderSeries({ pane: { width: 300, height: 400 } }, divRef, true, false))
      .toBe(true);
  });
});
