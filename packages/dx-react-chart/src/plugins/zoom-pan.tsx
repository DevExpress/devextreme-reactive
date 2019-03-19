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
  Action,
  ActionFn,
  PluginComponents,
  withComponents,
} from '@devexpress/dx-react-core';
import { DragBox } from '../templates/drag-box';
import {
  ARGUMENT_DOMAIN, adjustLayout, getRootOffset, getDeltaForTouches, offsetCoordinates,
  getValueScaleName, getBounds, adjustBounds, checkDragToZoom,
} from '@devexpress/dx-chart-core';
import {
  ZoomAndPanProps, ZoomAndPanState, LastCoordinates,
  NumberArray, ViewportOptions,
} from '../types';

class ZoomAndPanBase extends React.PureComponent<ZoomAndPanProps, ZoomAndPanState> {
  lastCoordinates: LastCoordinates = null;
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
    panKey: 'shift',
    dragToZoom: false,
  };

  changeViewport: ActionFn<ViewportOptions> = (viewport) => {
    this.setState((state, { onViewportChange }) => {
      // There should be some check that viewport is actually changed.
      // But *viewport* is built outside and most like will always be new instance.
      // So it should be fieldwise equality check.
      // For now action is expected to be called only when *viewport* is really changed.
      if (onViewportChange) {
        onViewportChange(viewport as ViewportOptions);
      }
      return { viewport: viewport as ViewportOptions };
    });
  }

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

  handleStart = (dragToZoom, panKey) => (e) => {
    this.offset = getRootOffset(e.currentTarget);
    this.drawRectange = checkDragToZoom(dragToZoom, panKey, e.nativeEvent);
    if (e.touches && e.touches.length === 2) {
      this.multiTouchDelta = getDeltaForTouches(e.touches);
    }
  }

  handleTouchMove = (scales, allowForArgument, allowForValue) => (e) => {
    const currentDelta = getDeltaForTouches(e.touches);

    this.zoom(scales, currentDelta - this.multiTouchDelta!, allowForArgument, allowForValue);
    this.multiTouchDelta = currentDelta;
  }

  handleMouseMove = (scales, clientOffset, allowForArgument, allowForValue) => {
    if (this.multiTouchDelta) {
      return;
    }

    const coords = offsetCoordinates(clientOffset, this.offset as NumberArray);
    if (!this.lastCoordinates) {
      this.lastCoordinates = coords;
      if (this.drawRectange) {
        this.rectangle = coords;
      }
      return;
    }
    const deltaX = coords.x - this.lastCoordinates.x;
    const deltaY = coords.y - this.lastCoordinates.y;

    this.setState(({ viewport, rectBox }) => {
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
      const argumentBounds = adjustBounds(
        ARGUMENT_DOMAIN, scales, allowForArgument, 'pan', getBounds, deltaX, viewport,
      );
      const valueBounds = adjustBounds(
        getValueScaleName(viewport), scales, allowForValue, 'pan', getBounds, deltaY, viewport,
      );
      return {
        viewport: {
          argumentStart: argumentBounds[0],
          argumentEnd: argumentBounds[1],
          valueStart: valueBounds[0],
          valueEnd: valueBounds[1],
        },
      };
    });
  }

  handleMouseUp = (scales, allowForArgument, allowForValue) => {
    this.lastCoordinates = null;
    this.multiTouchDelta = null;
    if (this.drawRectange) {
      this.setState(({ viewport, rectBox }) => {
        this.drawRectange = false;
        const argumentBounds = adjustBounds(
          ARGUMENT_DOMAIN, scales, allowForArgument, 'zoom',
          () => [rectBox!.x, rectBox!.x + rectBox!.width], 0, viewport,
        );
        const valueBounds = adjustBounds(
          getValueScaleName(viewport), scales, allowForValue, 'zoom',
          () => [rectBox!.y + rectBox!.height, rectBox!.y], 0, viewport,
        );
        return {
          rectBox: { x: 0, y: 0, width: 0, height: 0 },
          viewport: {
            argumentStart: argumentBounds[0],
            argumentEnd: argumentBounds[1],
            valueStart: valueBounds[0],
            valueEnd: valueBounds[1],
          },
        };
      });
    }
  }

  zoom = (scales, delta, allowForArgument, allowForValue) => {
    this.setState(({ viewport }) => {
      const argumentBounds = adjustBounds(
        ARGUMENT_DOMAIN, scales, allowForArgument, 'zoom', getBounds, delta, viewport,
      );
      const valueBounds = adjustBounds(
        getValueScaleName(viewport), scales, allowForValue, 'zoom', getBounds, delta, viewport,
      );
      return {
        viewport: {
          argumentStart: argumentBounds[0],
          argumentEnd: argumentBounds[1],
          valueStart: valueBounds[0],
          valueEnd: valueBounds[1],
        },
      };
    });
  }

  handleScroll = (scales, allowForArgument, allowForValue) => (e) => {
    e.preventDefault();
    this.zoom(scales, e.nativeEvent.wheelDelta, allowForArgument, allowForValue);
  }

  render() {
    const { viewport, rectBox } = this.state;
    const {
      dragBoxComponent: DragBoxComponent,
      interactionWithValues,
      interactionWithArguments,
      dragToZoom,
      panKey,
     } = this.props;
    const getAdjustedLayout = ({
      domains,
      ranges,
    }: Getters) => adjustLayout(domains, ranges, viewport || {});
    return (
      <Plugin name="zoomAndPan">
      <Getter name="ranges" computed={getAdjustedLayout} />
      <Action name="changeViewport" action={this.changeViewport} />
        <Template name="root">
          <TemplateConnector>
            {({ scales }) =>
            <DragDropProvider>
              <DropTarget
                onOver={({ _, clientOffset }) =>
                this.handleMouseMove(
                  scales, clientOffset, interactionWithArguments, interactionWithValues,
                )}
                onDrop={() => this.handleMouseUp(
                  scales, interactionWithArguments, interactionWithValues,
                )}
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
                  onWheel: this.handleScroll(
                    scales, interactionWithArguments, interactionWithValues,
                  ),
                  onMouseDown: this.handleStart(dragToZoom, panKey),
                  onTouchStart: this.handleStart,
                  onTouchMove: this.handleTouchMove(
                    scales, interactionWithArguments, interactionWithValues,
                  ),
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
