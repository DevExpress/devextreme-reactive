import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  pluginDepsToComponents, getComputedState,
} from '@devexpress/dx-testing';
import {
  adjustLayout, attachEvents, detachEvents, setCursorType,
  isKeyPressed, getViewport, getEventCoords,
} from '@devexpress/dx-chart-core';
import { ZoomAndPan } from './zoom-and-pan';

jest.mock('@devexpress/dx-chart-core', () => ({
  adjustLayout: jest.fn().mockReturnValue('adjusted-ranges'),
  attachEvents: jest.fn(),
  detachEvents: jest.fn(),
  getRect: jest.fn(),
  getOffset: jest.fn(),
  getEventCoords: jest.fn(),
  isKeyPressed: jest.fn(),
  isMultiTouch: jest.fn(),
  setCursorType: jest.fn(),
  getViewport: jest.fn(),
}));

const DragBoxComponent = () => null;

describe('ZoomAndPan', () => {
  const defaultDeps = {
    getter: {
      domains: 'test-domains',
      ranges: 'test-ranges',
      rotated: 'test-rotated',
      rootRef: {
        current: {},
      },
      layouts: {
        pane: {},
      },
    },
  };
  const defaultProps = {
    dragBoxComponent: DragBoxComponent,
    viewport: {
      argumentStart: 'test-arg-start-bound',
      argumentEnd: 'test-arg-end-bound',
      valueStart: 'test-val-start-bound',
      valueEnd: 'test-val-end-bound',
      scaleName: 'scale-1',
    },
  };

  afterEach(jest.clearAllMocks);

  it('should provide getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ZoomAndPan  {...defaultProps} />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      ...defaultDeps.getter,
      ranges: 'adjusted-ranges',
    });
    expect(adjustLayout).toBeCalledWith('test-domains', 'test-ranges', defaultProps.viewport);
  });

  it('should handle *defaultViewport* property', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ZoomAndPan  {...defaultProps} />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      ...defaultDeps.getter,
      ranges: 'adjusted-ranges',
    });
  });

  it('should attach events', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ZoomAndPan  {...defaultProps} />
      </PluginHost>
    ));
    expect(attachEvents).toBeCalledTimes(1);
  });

  it('should detach events', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ZoomAndPan  {...defaultProps} />
      </PluginHost>
    ));

    tree.unmount();
    expect(detachEvents).toBeCalledTimes(3);
  });

  it('should call "preventDefault" in "start" handler', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ZoomAndPan  {...defaultProps} />
      </PluginHost>
    ));
    const preventDefault = jest.fn();
    const { onStart } = tree.find('ZoomPanProvider').props() as any;

    onStart({ preventDefault });

    expect(preventDefault).toBeCalled();
  });

  it('should call "setCursorType" on mount', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ZoomAndPan  {...defaultProps} />
      </PluginHost>
    ));
    expect(setCursorType.mock.calls[0]).toEqual([expect.anything()]);
  });

  it('should call "setCursorType" on start handler', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ZoomAndPan  {...defaultProps} />
      </PluginHost>
    ));
    const event = { preventDefault: jest.fn, currentTarget: {} };
    const { onStart } = tree.find('ZoomPanProvider').props() as any;
    onStart(event);
    expect(setCursorType.mock.calls[1]).toEqual([expect.anything(), 'grabbing']);
  });

  it('should not call "setCursorType" on start handler, "isKeyPressed" return true', () => {
    isKeyPressed.mockReturnValue(true);
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ZoomAndPan  {...defaultProps} />
      </PluginHost>
    ));
    const event = { preventDefault: jest.fn, currentTarget: {} };
    const { onStart } = tree.find('ZoomPanProvider').props() as any;
    onStart(event);
    expect(setCursorType.mock.calls.length).toBe(1);
  });

  it('should not calculate a new state if "rectBox" is null while ending of zoom (3130)', () => {
    // https://github.com/DevExpress/devextreme-reactive/issues/3130
    isKeyPressed.mockReturnValue(true);
    getEventCoords.mockReturnValue(100);
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ZoomAndPan  {...defaultProps} />
      </PluginHost>
    ));

    const event = { preventDefault: jest.fn, currentTarget: {} };
    const { onEnd, onStart } = tree.find('ZoomPanProvider').props() as any;

    onStart(event);
    tree.update();
    onEnd();

    expect(getViewport.mock.calls.length).toBe(0);
  });
});
