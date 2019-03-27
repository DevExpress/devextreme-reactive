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
  adjustLayout, getRootOffset, getDeltaForTouches,
  getViewport, checkDragToZoom,
} from '@devexpress/dx-chart-core';
import {
  ZoomAndPanProps, ZoomAndPanState, NumberArray,
} from '../types';

class ZoomAndPanBase extends React.PureComponent<ZoomAndPanProps, ZoomAndPanState> {
  lastCoordinates: NumberArray | null = null;
  rectangle = { x: 0, y: 0 };
  drawRectange = false;
  offset: number[] = [0, 0];
  static components: PluginComponents = {
    dragBoxComponent: 'DragBox',
  };
  multiTouchDelta: number | null = null;
  static defaultProps: Partial<ZoomAndPanProps> = {
    interactionWithValues: 'none',
    interactionWithArguments: 'both',
    zoomRegionKey: 'shift',
  };

  constructor(props: ZoomAndPanProps) {
    super(props);

    this.state = {
      viewport: props.viewport || props.defaultViewport,
      rectBox: { x: 0, y: 0, width: 0, height: 0 },
    };
  }

  static getDerivedStateFromProps(props: ZoomAndPanProps, state: ZoomAndPanState): ZoomAndPanState {
    return {
      viewport: props.viewport !== undefined ? props.viewport : state.viewport,
      rectBox: state.rectBox,
    };
  }

  handleStart = zoomRegionKey => (e) => {
    this.offset = getRootOffset(e.currentTarget);
    this.drawRectange = checkDragToZoom(zoomRegionKey, e.nativeEvent);
    if (e.touches && e.touches.length === 2) {
      this.multiTouchDelta = getDeltaForTouches(e.touches).delta;
    }
  }

  handleTouchMove = (scales, interactions) => (e) => {
    if (e.touches && e.touches.length === 2) {
      const current = getDeltaForTouches(e.touches);
      this.zoom(scales, current.delta - this.multiTouchDelta!, current.center, interactions);
      this.multiTouchDelta = current.delta;
    }
  }

  handleMouseMove = (scales, clientOffset, interactions) => {
    if (this.multiTouchDelta) {
      return;
    }

    const coords: NumberArray = [clientOffset.x - this.offset[0], clientOffset.y - this.offset[1]];
    if (!this.lastCoordinates) {
      this.lastCoordinates = coords;
      if (this.drawRectange) {
        this.rectangle = { x: coords[0], y: coords[1] };
      }
      return;
    }
    const deltaX = coords[0] - this.lastCoordinates[0];
    const deltaY = coords[1] - this.lastCoordinates[1];

    this.setState(({ viewport, rectBox }, { onViewportChange }) => {
      if (this.lastCoordinates) {
        this.lastCoordinates = coords;
      }
      if (this.drawRectange) {
        return {
          rectBox: {
            x: this.rectangle.x,
            y: this.rectangle.y,
            width: rectBox!.width + deltaX,
            height: rectBox!.height + deltaY,
          },
        };
      }
      return getViewport(
        scales, interactions, 'pan',
        // In event coords space vertical direction goes down, in chart space - up.
        [+deltaX, -deltaY], null, null, viewport, onViewportChange,
      );
    });
  }

  handleMouseUp = (scales, interactions) => {
    this.lastCoordinates = null;
    this.multiTouchDelta = null;
    if (this.drawRectange) {
      this.setState(({ viewport, rectBox }, { onViewportChange }) => {
        this.drawRectange = false;

        return {
          rectBox: { x: 0, y: 0, width: 0, height: 0 },
          ...getViewport(
            scales, interactions, 'zoom',
            null,
            null,
            [
              [rectBox!.x, rectBox!.x + rectBox!.width],
              // In event coords space vertical direction goes down, in chart space - up.
              [rectBox!.y + rectBox!.height, rectBox!.y],
            ],
            viewport, onViewportChange,
          ),
        };
      });
    }
  }

  zoom = (scales, delta, anchors, interactions) => {
    this.setState(({ viewport }, { onViewportChange }) => {
      return getViewport(
        scales, interactions, 'zoom',
        [delta, delta], anchors, null, viewport, onViewportChange,
      );
    });
  }

  handleScroll = (scales, interactions) => (e) => {
    e.preventDefault();
    const offset = getRootOffset(e.currentTarget);
    const center = [e.clientX - offset[0], e.clientY - offset[1]];
    this.zoom(scales, e.nativeEvent.wheelDelta, center, interactions);
  }

  render() {
    const { viewport, rectBox } = this.state;
    const {
      dragBoxComponent: DragBoxComponent,
      interactionWithValues,
      interactionWithArguments,
      zoomRegionKey,
     } = this.props;
    const interactions = [interactionWithArguments, interactionWithValues];
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
                onOver={({ _, clientOffset }) =>
                this.handleMouseMove(scales, clientOffset, interactions)}
                onDrop={() => this.handleMouseUp(scales, interactions)}
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
                  onWheel: this.handleScroll(scales, interactions),
                  onMouseDown: this.handleStart(zoomRegionKey),
                  onTouchStart: this.handleStart(false),
                  onTouchMove: this.handleTouchMove(scales, interactions),
                }}
              />}
          </TemplateConnector>
        </Template>

        <Template name="series">
          <TemplatePlaceholder />
          <DragBoxComponent
            rectBox={rectBox!}
            color={'gray'}
            opacity={0.3}
          />
        </Template>
      </Plugin >
    );
  }
}

export const ZoomAndPan: React.ComponentType<
  ZoomAndPanProps
> =  withComponents({ DragBox })(ZoomAndPanBase);
