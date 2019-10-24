import { getReadiness } from './computeds';

describe('#getReadiness', () => {
  it('should return false, pane size is zero', () => {
    const pane = { width: 0, height: 0 };
    expect(getReadiness({ pane }, { current: {} })).toBe(false);
  });

  it('should return false, div zise is not equal size of elements inside', () => {
    const pane = { width: 230, height: 340 };
    const divRef = { current: { getBoundingClientRect: () => ({ width: 300, height: 400 }) } };
    const leftElement = { width: 2, height: 3 };
    const bottomElement = { width: 3, height: 4 };

    expect(getReadiness({ pane }, divRef)).toBe(false);
    expect(getReadiness({
      pane,
      'left-element': leftElement, 'bottom-element': bottomElement,
    }, divRef)).toBe(false);
  });

  it('should return true, div zise is equal size of elements inside', () => {
    const divRef = { current: { getBoundingClientRect: () => ({ width: 300, height: 400 }) } };
    const leftElement = { width: 70, height: 3 };
    const bottomElement = { width: 3, height: 60 };

    expect(getReadiness({ pane: { width: 300, height: 400 } }, divRef)).toBe(true);
    expect(getReadiness({
      pane: { width: 230, height: 340 },
      'left-element': leftElement, 'bottom-element': bottomElement,
    }, divRef)).toBe(true);
  });
});
