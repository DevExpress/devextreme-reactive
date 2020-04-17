import { getReadiness } from './computeds';

describe('#getReadiness', () => {
  const divRef = { current: { getBoundingClientRect: () => ({ width: 300, height: 400 }) } };
  it('should return false, pane size is zero', () => {
    const pane = { width: 0, height: 0 };
    expect(getReadiness({ pane }, { current: {} }, false, false)).toBeFalsy();
  });

  it('should return false, div size is not equal size of elements inside', () => {
    const pane = { width: 230, height: 340 };
    const leftElement = { width: 2, height: 3 };
    const bottomElement = { width: 3, height: 4 };

    expect(getReadiness({ pane }, divRef, false, false)).toBeFalsy();
    expect(getReadiness({
      pane,
      'left-element': leftElement, 'bottom-element': bottomElement,
    }, divRef, false, false)).toBeFalsy();
  });

  it('should return true, div size is equal size of elements inside', () => {
    const leftElement = { width: 70, height: 3 };
    const bottomElement = { width: 3, height: 60 };

    expect(getReadiness({ pane: { width: 300, height: 400 } }, divRef, false, false)).toBeTruthy();
    expect(getReadiness({
      pane: { width: 230, height: 340 },
      'left-element': leftElement, 'bottom-element': bottomElement,
    }, divRef, false, false)).toBeTruthy();
  });

  it('should return false if the div size is equal to the size of the elements inside but previous data is empty and axes exist', () => {
    expect(getReadiness({ pane: { width: 300, height: 400 } }, divRef, true, true))
      .toBeFalsy();
  });

  it('should return true if the div size is equal to the size of the elements inside and previous data is empty but axes do not exist', () => {
    expect(getReadiness({ pane: { width: 300, height: 400 } }, divRef, true, false))
      .toBeTruthy();
  });
});
