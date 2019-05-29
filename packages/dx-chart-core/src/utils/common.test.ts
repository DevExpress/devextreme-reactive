import { getOffset, getEventCoords } from './common';

describe('Common', () => {
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

  describe('#getEventCoords', () => {
    it('should return coordinates, mouse gesture', () => {
      expect(getEventCoords({ pageX: 10, pageY: 30 }, [5, 7])).toEqual([5, 23]);
    });

    it('should return coordinates, touch gesture', () => {
      expect(getEventCoords({ touches: [{ pageX: 10, pageY: 30 }] }, [5, 7])).toEqual([5, 23]);
    });
  });
});
