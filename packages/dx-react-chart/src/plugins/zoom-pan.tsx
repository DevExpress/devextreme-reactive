import * as React from 'react';
import {
  Plugin,
  TemplatePlaceholder,
  Template,
  DragDropProvider,
  DropTarget,
  DragSource,
  TemplateConnector,
  Getters,
  Getter,
  PluginComponents,
  withComponents,
} from '@devexpress/dx-react-core';
import { DragBox } from '../templates/drag-box';
import {
  adjustLayout, getViewport, isKeyPressed, getOffset, getDeltaForTouches,
  ScalesCache,
} from '@devexpress/dx-chart-core';
import {
  ZoomAndPanProps, ZoomAndPanState, NumberArray, ZoomPanProviderProps,
} from '../types';

const events = {
  wheel: 'onWheel',
  mousedown: 'onDown',
  touchstart: 'onDown',
  touchmove: 'onTouchMove',
  touchend: 'onTouchEnd',
};

class ZoomPanProvider extends React.PureComponent<ZoomPanProviderProps> {
  ref: Element | undefined = undefined;
  componentDidMount() {
    this.ref = this.props.rootRef.current!;
    if (!this.ref) return;
    this.detachDocumentEvents();
    this.attachDocumentEvents();
  }

  attachDocumentEvents() {
    Object.keys(events).forEach((el) => {
      this.ref!.addEventListener(el, this.handler(el), { passive: false });
    });
  }

  detachDocumentEvents() {
    Object.keys(events).forEach((el) => {
      this.ref!.removeEventListener(el, this.handler(el));
    });
  }

  componentWillUnmount() {
    if (!this.ref) return;
    this.detachDocumentEvents();
  }

  handler(key: string) {
    return (e: any) => {
      this.props[events[key]](e);
    };
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
      // Rectangle mode should be canceled if "zoomRegionKey" is released during mouse movevent or
      // not pressed when mouse is up. To do it access to "event" object is required in
      // "handleMouseMove" and "handleMouseUp".
      // TODO: Provide rectangle mode canceling.
    if (isKeyPressed(e, zoomRegionKey)) {
      this.rectOrigin = [e.pageX - this.offset[0], e.pageY - this.offset[1]];
    }
    if (e.touches && e.touches.length === 2) {
      this.multiTouchDelta = getDeltaForTouches(e.touches).delta;
    }
  }

  handleTouchMove(scales: ScalesCache, e: any) {
    e.preventDefault();
    if (e.touches && e.touches.length === 2) {
      const current = getDeltaForTouches(e.touches);
      this.zoom(scales, current.delta - this.multiTouchDelta!, current.center);
      this.multiTouchDelta = current.delta;
    } else {
      this.handleMouseMove(scales, { x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  }

  handleMouseMove(scales: ScalesCache, clientOffset: { x: number, y: number }) {
    if (this.multiTouchDelta) {
      return;
    }
    const coords: NumberArray = [clientOffset.x - this.offset[0], clientOffset.y - this.offset[1]];
    if (!this.lastCoordinates) {
      this.lastCoordinates = coords;
      return;
    }
    const deltaX = coords[0] - this.lastCoordinates[0];
    const deltaY = coords[1] - this.lastCoordinates[1];

    this.setState((
      { viewport }, { onViewportChange, interactionWithArguments, interactionWithValues },
    ) => {
      if (this.lastCoordinates) {
        this.lastCoordinates = coords;
      }
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

  handleMouseUp(scales: ScalesCache) {
    this.lastCoordinates = null;
    this.multiTouchDelta = null;
    if (this.rectOrigin) {
      this.setState((
        { viewport, rectBox },
        { onViewportChange, interactionWithArguments, interactionWithValues },
      ) => {
        this.rectOrigin = null;
        return {
          rectBox:  null,
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

  handleScroll(scales: ScalesCache, e: any) {
    e.preventDefault();
    const offset = getOffset(e.currentTarget);
    const center: NumberArray = [e.pageX - offset[0], e.pageY - offset[1]];
    this.zoom(scales, e.wheelDelta, center);
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
          <TemplateConnector>
            {({ scales, rootRef }) => (
            <React.Fragment>
            <DragDropProvider>
              <DropTarget
                onOver={({ _, clientOffset }) => this.handleMouseMove(scales, clientOffset)}
                onDrop={() => this.handleMouseUp(scales)}
              >
              <DragSource payload={null}>
                  <TemplatePlaceholder/>
             </DragSource>
              </DropTarget>
            </DragDropProvider>
            <ZoomPanProvider
              rootRef={rootRef}
              onWheel={e => this.handleScroll(scales, e)}
              onDown={e => this.handleStart(zoomRegionKey!, e)}
              onTouchMove={e => this.handleTouchMove(scales, e)}
              onTouchEnd={e => this.handleMouseUp(scales)}
            />
            </React.Fragment>)}
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
      </Plugin >
    );
  }
}

export const ZoomAndPan: React.ComponentType<
  ZoomAndPanProps
> =  withComponents({ DragBox })(ZoomAndPanBase);
