import { getHoverTargets, processPointerMove } from './hover-state';

describe('HoverState', () => {
  describe('#processPointerMove', () => {
    it('should return selected target and notify', () => {
      const mock = jest.fn();
      const result = processPointerMove([{ series: '1' }, { series: '2' }], null, mock);

      expect(result).toEqual({ series: '2' });
      expect(mock).toBeCalledWith({ series: '2' });
    });

    it('should notify when target is changed to null', () => {
      const mock = jest.fn();
      const result = processPointerMove([], { series: '1' }, mock);

      expect(result).toEqual(null);
      expect(mock).toBeCalledWith(null);
    });

    it('should notify when target is changed', () => {
      const mock = jest.fn();
      const result = processPointerMove([{ series: '2' }], { series: '1' }, mock);

      expect(result).toEqual({ series: '2' });
      expect(mock).toBeCalledWith({ series: '2' });
    });

    it('should not notify when target is not changed', () => {
      const mock = jest.fn();
      const result = processPointerMove([{ series: '1' }, { series: '2' }], { series: '2' }, mock);

      expect(result).toEqual(undefined);
      expect(mock).not.toBeCalled();
    });
  });

  describe('#getHoveredTargets', () => {
    it('should return empty array', () => {
      expect(getHoverTargets(null)).toEqual([]);
    });

    it('should return item as is', () => {
      expect(getHoverTargets({ series: '1' })).toEqual([{ series: '1' }]);
    });

    it('should return additional item for point', () => {
      expect(getHoverTargets({ series: '1', point: 2 }))
        .toEqual([{ series: '1' }, { series: '1', point: 2 }]);
    });
  });
});
