import * as React from 'react';
import {
  Plugin,
  TemplatePlaceholder,
  Template,
  TemplateConnector,
  Getters,
  Getter,
  PluginComponents,
  withComponents,
} from '@devexpress/dx-react-core';
import { DragBox } from '../templates/drag-box';
import {
  adjustLayout, getViewport, isKeyPressed, getOffset, getDeltaForTouches,
  ScalesCache, getWheelDelta, getCoordsWithOffset,
} from '@devexpress/dx-chart-core';
import {
  ZoomAndPanProps, ZoomAndPanState, NumberArray, ZoomPanProviderProps, EventHandlers,
} from '../types';

const events = {
  wheel: { func: 'onWheel' },
  mousedown: {
    func: 'onStart',
    extraEvents: ['mousemove', 'mouseup'],
  },
  touchstart: {
    func: 'onStart',
    extraEvents: ['touchmove', 'touchend'],
  },
};

class ZoomPanProvider extends React.PureComponent<ZoomPanProviderProps> {
  handlers!: EventHandlers;
  ref!: Element;

  componentDidMount() {
    this.ref = this.props.rootRef.current!;
    this.handlers = Object.keys(events).reduce((prev, key) => {
      const extraEvents = events[key].extraEvents;
      return {
        ...prev,
        [key]: (e: any) => {
          this.props[events[key].func](e);
          if (extraEvents) {
            const extraHandlers = {
              [extraEvents[0]]: (event: any) => { this.props.onMove(event); },
              [extraEvents[1]]: (event: any) => {
                this.props.onEnd(event);
                this.detachEvents(window, extraHandlers);
              },
            };
            this.attachEvents(window, extraHandlers);
          }
        },
      };
    }, {});
    this.attachEvents(this.ref, this.handlers);
  }

  attachEvents(node, handlers) {
    Object.keys(handlers).forEach((el) => {
      node.addEventListener(el, handlers[el], { passive: false });
    });
  }

  detachEvents(node, handlers) {
    Object.keys(handlers).forEach((el) => {
      node.removeEventListener(el, handlers[el]);
    });
  }

  componentWillUnmount() {
    this.detachEvents(this.ref, this.handlers);
  }

  render() {
    return null;
  }
}

// tslint:disable-next-line:max-classes-per-file
class ZoomAndPanBase extends React.PureComponent<ZoomAndPanProps, ZoomAndPanState> {
  static components: PluginComponents = {
    dragBoxComponent: 'DragBox',
  };
  static defaultProps: Partial<ZoomAndPanProps> = {
    interactionWithValues: 'none',
    interactionWithArguments: 'both',
    zoomRegionKey: 'shift',
  };

  multiTouchDelta: number | null = null;
  lastCoordinates: NumberArray | null = null;
  rectOrigin: NumberArray | null = null;
  offset: NumberArray = [0, 0];

  constructor(props: ZoomAndPanProps) {
    super(props);

    this.state = {
      viewport: props.viewport || props.defaultViewport,
      rectBox: null,
    };
  }

  static getDerivedStateFromProps(props: ZoomAndPanProps, state: ZoomAndPanState): ZoomAndPanState {
    return {
      viewport: props.viewport !== undefined ? props.viewport : state.viewport,
    };
  }

  handleStart(zoomRegionKey: string, e: any) {
    this.offset = getOffset(e.currentTarget);
    const coords = getCoordsWithOffset(e, this.offset);
      // Rectangle mode should be canceled if "zoomRegionKey" is released during mouse movevent or
      // not pressed when mouse is up. To do it access to "event" object is required in
      // "handleMove" and "handleEnd".
      // TODO: Provide rectangle mode canceling.
    if (isKeyPressed(e, zoomRegionKey)) {
      this.rectOrigin = coords;
    }
    if (e.touches && e.touches.length === 2) {
      this.multiTouchDelta = getDeltaForTouches(e.touches).delta;
    }
    this.lastCoordinates = coords;
  }

  handleMove(scales: ScalesCache, e: any) {
    e.preventDefault();
    if (e.touches && e.touches.length === 2) {
      const current = getDeltaForTouches(e.touches);
      this.zoom(scales, current.delta - this.multiTouchDelta!, current.center);
      this.multiTouchDelta = current.delta;
    } else {
      this.scroll(scales, e.touches ? e.touches[0] : e);
    }
  }

  scroll(scales: ScalesCache, e: any) {
    const coords: NumberArray = getCoordsWithOffset(e, this.offset);
    const deltaX = coords[0] - this.lastCoordinates![0];
    const deltaY = coords[1] - this.lastCoordinates![1];
    this.lastCoordinates = coords;
    this.setState((
      { viewport }, { onViewportChange, interactionWithArguments, interactionWithValues },
    ) => {
      if (this.rectOrigin) {
        return {
          rectBox: {
            x: Math.min(this.rectOrigin[0], coords[0]),
            y: Math.min(this.rectOrigin[1], coords[1]),
            width: Math.abs(this.rectOrigin[0] - coords[0]),
            height: Math.abs(this.rectOrigin[1] - coords[1]),
          },
        };
      }
      return getViewport(
        scales, [interactionWithArguments!, interactionWithValues!], 'pan',
        [-deltaX, -deltaY], null, null, viewport, onViewportChange,
      );
    });
  }

  handleEnd(scales: ScalesCache) {
    this.lastCoordinates = null;
    this.multiTouchDelta = null;
    if (this.rectOrigin) {
      this.setState((
        { viewport, rectBox },
        { onViewportChange, interactionWithArguments, interactionWithValues },
      ) => {
        this.rectOrigin = null;
        return {
          rectBox: null,
          ...getViewport(
            scales, [interactionWithArguments!, interactionWithValues!], 'zoom',
            null,
            null,
            [
              [rectBox!.x, rectBox!.x + rectBox!.width],
              [rectBox!.y, rectBox!.y + rectBox!.height],
            ],
            viewport, onViewportChange,
          ),
        };
      });
    }
  }

  zoom(scales: ScalesCache, delta: number, anchors: [number, number]) {
    this.setState((
      { viewport }, { onViewportChange, interactionWithArguments, interactionWithValues },
    ) => {
      return getViewport(
        scales, [interactionWithArguments!, interactionWithValues!], 'zoom',
        [delta, delta], anchors, null, viewport, onViewportChange,
      );
    });
  }

  handleZoom(scales: ScalesCache, e: any) {
    e.preventDefault();
    const offset = getOffset(e.currentTarget);
    const center: NumberArray = getCoordsWithOffset(e, offset);
    this.zoom(scales, getWheelDelta(e), center);
  }

  render() {
    const { viewport, rectBox } = this.state;
    const {
      dragBoxComponent: DragBoxComponent,
      zoomRegionKey,
     } = this.props;
    const getAdjustedLayout = ({
      domains,
      ranges,
    }: Getters) => adjustLayout(domains, ranges, viewport);
    return (
      <Plugin name="zoomAndPan">
      <Getter name="ranges" computed={getAdjustedLayout} />
        <Template name="root">
        <TemplatePlaceholder />
          <TemplateConnector>
            {({ scales, rootRef }) => (
                <ZoomPanProvider
                  rootRef={rootRef}
                  onWheel={e => this.handleZoom(scales, e)}
                  onStart={e => this.handleStart(zoomRegionKey!, e)}
                  onMove={e => this.handleMove(scales, e)}
                  onEnd={e => this.handleEnd(scales)}
                />
              )}
          </TemplateConnector>
        </Template>
        <Template name="series">
          <TemplatePlaceholder />
          {rectBox ? (
              <DragBoxComponent
                rect={rectBox!}
              />
          ) : null}
        </Template>
      </Plugin>
    );
  }
}

export const ZoomAndPan: React.ComponentType<
  ZoomAndPanProps
> =  withComponents({ DragBox })(ZoomAndPanBase);
