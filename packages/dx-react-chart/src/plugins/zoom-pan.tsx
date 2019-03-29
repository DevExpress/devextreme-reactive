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
  adjustLayout, getViewport, isKeyPressed, getRootOffset, getDeltaForTouches,
  ScalesCache,
} from '@devexpress/dx-chart-core';
import {
  ZoomAndPanProps, ZoomAndPanState, NumberArray,
} from '../types';

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

  handleStart(zoomRegionKey: string) {
    return (e: any) => {
      this.offset = getRootOffset(e.currentTarget);
      // Rectangle mode should be canceled if "zoomRegionKey" is released during mouse movevent or
      // not pressed when mouse is up. To do it access to "event" object is required in
      // "handleMouseMove" and "handleMouseUp".
      // TODO: Provide rectangle mode canceling.
      if (isKeyPressed(e.nativeEvent, zoomRegionKey)) {
        this.rectOrigin = [e.pageX - this.offset[0], e.pageY - this.offset[1]];
      }
      if (e.touches && e.touches.length === 2) {
        this.multiTouchDelta = getDeltaForTouches(e.touches).delta;
      }
    };
  }

  handleTouchMove(scales: ScalesCache) {
    return (e: any) => {
      if (e.touches && e.touches.length === 2) {
        const current = getDeltaForTouches(e.touches);
        this.zoom(scales, current.delta - this.multiTouchDelta!, current.center);
        this.multiTouchDelta = current.delta;
      }
    };
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

  handleScroll(scales: ScalesCache) {
    return (e: any) => {
      e.preventDefault();
      const offset = getRootOffset(e.currentTarget);
      const center: NumberArray = [e.pageX - offset[0], e.pageY - offset[1]];
      this.zoom(scales, e.nativeEvent.wheelDelta, center);
    };
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
            {({ scales }) =>
            <DragDropProvider>
              <DropTarget
                onOver={({ _, clientOffset }) => this.handleMouseMove(scales, clientOffset)}
                onDrop={() => this.handleMouseUp(scales)}
              >
                <DragSource payload={null}>
                  <TemplatePlaceholder />
                </DragSource>
              </DropTarget>
            </DragDropProvider>}
          </TemplateConnector>
        </Template>

        <Template name="canvas">
          <TemplateConnector>
            {({ scales }) =>
              <TemplatePlaceholder
                params={{
                  onWheel: this.handleScroll(scales),
                  onMouseDown: this.handleStart(zoomRegionKey!),
                  onTouchStart: this.handleStart('none'),
                  onTouchMove: this.handleTouchMove(scales),
                }}
              />}
          </TemplateConnector>
        </Template>

        <Template name="series">
          <TemplatePlaceholder />
          {rectBox ? (
              <DragBoxComponent
                rectBox={rectBox!}
                color={'gray'}
                opacity={0.3}
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
