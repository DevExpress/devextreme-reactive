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
  Size,
  clearSelection,
} from '@devexpress/dx-react-core';
import { DragBox } from '../templates/drag-box';
import {
  adjustLayout, getViewport, isKeyPressed, getOffset, getDeltaForTouches, getRect,
  ScalesCache, getWheelDelta, getEventCoords, isMultiTouch, attachEvents, detachEvents,
  setCursorType,
} from '@devexpress/dx-chart-core';
import {
  ZoomAndPanProps, ZoomAndPanState, Location, NumberArray, ZoomPanProviderProps, EventHandlers,
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
  svgElement!: SVGElement;
  windowHandlers!: { [key: string]: EventHandlers};

  componentDidMount() {
    this.svgElement = this.props.rootRef.current!;
    setCursorType(this.svgElement);

    this.windowHandlers = Object.keys(events).reduce((prev, key) => {
      const extraEvents = events[key].extraEvents;
      if (extraEvents) {
        return {
          ...prev,
          [key]: {
            [extraEvents[0]]: (event: any) => {
              this.props.onMove(event);
            },
            [extraEvents[1]]: (event: any) => {
              this.props.onEnd(event);
              setCursorType(this.svgElement);
              detachEvents(window, this.windowHandlers[key]);
            },
          },
        };
      }
      return prev;
    }, {});

    this.handlers = Object.keys(events).reduce((prev, key) => {
      return {
        ...prev,
        [key]: (e: any) => {
          this.props[events[key].func](e);
          if (events[key].extraEvents) {
            attachEvents(window, this.windowHandlers[key]);
          }
        },
      };
    }, {});
    attachEvents(this.svgElement, this.handlers);
  }

  componentWillUnmount() {
    detachEvents(this.svgElement, this.handlers);
    Object.keys(this.windowHandlers).forEach((el) => {
      detachEvents(window, this.windowHandlers[el]);
    });
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
  lastCoordinates: Location | null = null;
  rectOrigin: Location | null = null;
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
    // Default browser behavior is prevented in "move" handler. It is not enough for IPad.
    // Calling "preventDefault" here (on "start") works for IPad.
    // Going further, since we have to call "preventDefault" on "start" we may try to get rid of
    // "preventDefault" on move.
    // TODO: Try to remove "preventDefault" from "move" handler.
    e.preventDefault();
    this.offset = getOffset(e.currentTarget);
    const coords = getEventCoords(e, this.offset);
      // Rectangle mode should be canceled if "zoomRegionKey" is released during mouse movevent or
      // not pressed when mouse is up. To do it access to "event" object is required in
      // "handleMove" and "handleEnd".
      // TODO: Provide rectangle mode canceling.
    if (isKeyPressed(e, zoomRegionKey)) {
      this.rectOrigin = coords;
    } else {
      setCursorType(e.currentTarget, 'grabbing');
    }
    if (isMultiTouch(e)) {
      this.multiTouchDelta = getDeltaForTouches(e.touches).delta;
    }
    this.lastCoordinates = coords;
  }

  handleMove(scales: ScalesCache, rotated: boolean, e: any, pane: Size) {
    e.preventDefault();
    clearSelection();
    if (isMultiTouch(e)) {
      const current = getDeltaForTouches(e.touches);
      this.zoom(scales, rotated, current.delta - this.multiTouchDelta!, current.center);
      this.multiTouchDelta = current.delta;
    } else {
      this.scroll(scales, rotated, e, pane);
    }
  }

  scroll(scales: ScalesCache, rotated: boolean, e: any, pane: Size) {
    const coords = getEventCoords(e, this.offset);
    const deltaX = coords[0] - this.lastCoordinates![0];
    const deltaY = coords[1] - this.lastCoordinates![1];
    this.lastCoordinates = coords;
    this.setState((
      { viewport }, { onViewportChange, interactionWithArguments, interactionWithValues },
    ) => {
      if (this.rectOrigin) {
        return {
          rectBox: getRect(
            rotated,
            interactionWithArguments!,
            interactionWithValues!,
            this.rectOrigin,
            coords,
            pane,
          ),
        };
      }
      return getViewport(
        scales, rotated, [interactionWithArguments!, interactionWithValues!], 'pan',
        [-deltaX, -deltaY], null, null, viewport, onViewportChange,
      );
    });
  }

  handleEnd(scales: ScalesCache, rotated: boolean) {
    this.lastCoordinates = null;
    this.multiTouchDelta = null;
    if (this.rectOrigin) {
      this.setState((
        { viewport, rectBox },
        { onViewportChange, interactionWithArguments, interactionWithValues },
      ) => {
        if (rectBox === null) return {};

        this.rectOrigin = null;
        return {
          rectBox: null,
          ...getViewport(
            scales, rotated, [interactionWithArguments!, interactionWithValues!], 'zoom',
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

  zoom(scales: ScalesCache, rotated: boolean, delta: number, anchors: Location) {
    this.setState((
      { viewport }, { onViewportChange, interactionWithArguments, interactionWithValues },
    ) => {
      return getViewport(
        scales, rotated, [interactionWithArguments!, interactionWithValues!], 'zoom',
        [delta, delta], anchors, null, viewport, onViewportChange,
      );
    });
  }

  handleZoom(scales: ScalesCache, rotated: boolean, e: any) {
    e.preventDefault();
    const center = getEventCoords(e, getOffset(e.currentTarget));
    this.zoom(scales, rotated, getWheelDelta(e), center);
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
            {({ scales, rotated, rootRef, layouts }) => (
                <ZoomPanProvider
                  rootRef={rootRef}
                  onWheel={e => this.handleZoom(scales, rotated, e)}
                  onStart={e => this.handleStart(zoomRegionKey!, e)}
                  onMove={e => this.handleMove(scales, rotated, e, layouts.pane)}
                  onEnd={e => this.handleEnd(scales, rotated)}
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
