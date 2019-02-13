import { bBoxes } from './computeds';

describe('bBoxes', () => {
  it('should set new placeholder bBox', () => {
    const result = bBoxes(
      {},
      { placeholder: 'placeholder', bBox: { width: 10, height: 20 } },
    );
    expect(result).toEqual({ placeholder: { width: 10, height: 20 } });
  });

  it('should change old bBox', () => {
    const result = bBoxes(
      { placeholder: { width: 10, height: 20 } },
      { placeholder: 'placeholder', bBox: { width: 30, height: 40 } },
    );
    expect(result).toEqual({ placeholder: { width: 30, height: 40 } });
  });

  it('should return prev state if new bBox is equal old', () => {
    const prevState = { placeholder: { width: 10, height: 20 } };
    const result = bBoxes(
      prevState,
      { placeholder: 'placeholder', bBox: { width: 10, height: 20 } },
    );
    expect(result).toBe(prevState);
  });
});
