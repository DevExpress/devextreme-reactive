import { bBoxes, getRanges } from './computeds';
import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';

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

describe('getRanges', () => {
  it('should create ranges', () => {
    const result = getRanges({ width: 400, height: 300 }, false);
    expect(result).toEqual({
      [ARGUMENT_DOMAIN]: [0, 400],
      [VALUE_DOMAIN]: [300, 0],
    });
  });

  it('should create rotated ranges', () => {
    const result = getRanges({ width: 400, height: 300 }, true);
    expect(result).toEqual({
      [ARGUMENT_DOMAIN]: [300, 0],
      [VALUE_DOMAIN]: [0, 400],
    });
  });
});
