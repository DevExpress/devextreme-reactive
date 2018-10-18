import { insertPlugin, createClickHandlers } from './utils';

describe('utils', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('#insertPlugin', () => {
    const mapPlugins = plugins => plugins.map(p => p.position().join());

    it('should work correctly', () => {
      const plugins = [
        { position: () => [1] },
        { position: () => [5, 3] },
      ];

      expect(mapPlugins(insertPlugin(plugins, { position: () => [0] })))
        .toEqual(['0', '1', '5,3']);
      expect(mapPlugins(insertPlugin(plugins, { position: () => [3, 2, 0] })))
        .toEqual(['1', '3,2,0', '5,3']);
      expect(mapPlugins(insertPlugin(plugins, { position: () => [5, 2] })))
        .toEqual(['1', '5,2', '5,3']);
      expect(mapPlugins(insertPlugin(plugins, { position: () => [5, 3, 1] })))
        .toEqual(['1', '5,3', '5,3,1']);
      expect(mapPlugins(insertPlugin(plugins, { position: () => [7] })))
        .toEqual(['1', '5,3', '7']);
      expect(mapPlugins(insertPlugin(plugins, { position: () => [1] })))
        .toEqual(['1', '5,3']);
    });
  });

  describe('#createClickHandlers', () => {
    const DELAY = 200;
    const clickEvent = jest.fn();
    const dblClickEvent = jest.fn();

    it('should not throw without arguments', () => {
      expect(() => createClickHandlers())
        .not.toThrow();

      expect(createClickHandlers())
        .toEqual({
          onClick: undefined,
          onDoubleClick: undefined,
        });
    });

    it('should return onClick function if onClick event is define', () => {
      const events = createClickHandlers(clickEvent);

      expect(events)
        .toEqual({
          onClick: expect.any(Function),
          onDoubleClick: undefined,
        });
    });

    it('should call onClick event with delay', () => {
      const payload = { data: 1 };
      const events = createClickHandlers(clickEvent);

      events.onClick(payload);

      setTimeout(() => {
        expect(clickEvent)
          .toHaveBeenCalledWith(payload);
      }, DELAY);
    });

    it('should return onDblClick function if onDblClick event is define', () => {
      const events = createClickHandlers(undefined, dblClickEvent);

      expect(events)
        .toEqual({
          onClick: undefined,
          onDoubleClick: expect.any(Function),
        });
    });

    it('should call onDblClick event without delay', () => {
      const payload = { data: 1 };
      const events = createClickHandlers(undefined, dblClickEvent);

      events.onDoubleClick(payload);

      expect(dblClickEvent)
        .toHaveBeenCalledWith(payload);
    });

    it('should not call onClick event if onDblClick event called', () => {
      const events = createClickHandlers(clickEvent, dblClickEvent);

      events.onClick();
      events.onDoubleClick();

      expect(dblClickEvent)
        .toHaveBeenCalled();
      setTimeout(() => {
        expect(clickEvent)
          .not.toHaveBeenCalled();
      }, DELAY);
    });
  });
});
