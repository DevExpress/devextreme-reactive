import { getOffset } from './root-offset';

describe('Root Offset', () => {
  describe('#getOffset', () => {
    it('should return element offset', () => {
      const mock = {
        getBoundingClientRect: () => ({ left: 400, top: 300 }),
        ownerDocument: {
          defaultView: { pageXOffset: 40, pageYOffset: 30 },
        },
      };

      expect(getOffset(mock as any)).toEqual([440, 330]);
    });
  });
});
