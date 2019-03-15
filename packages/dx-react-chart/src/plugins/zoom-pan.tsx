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
} from '@devexpress/dx-react-core';
import {
  ARGUMENT_DOMAIN, adjustLayout, getRootOffset, getDeltaForTouches, offsetCoordinates,
  getBounds, adjustBounds, getPrevBounds, getValueScaleName,
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
  multiTouch = false;

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

  handleStart = (e) => {
    this.offset = getRootOffset(e.currentTarget);
    if (e.nativeEvent.shiftKey) {
      this.drawRectange = true;
    }
    if (e.targetTouches && e.targetTouches.length === 2) {
      this.multiTouch = true;
    }
  }

  handleMouseMove = (scales, clientOffset) => {
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

    if (this.multiTouch) {
      this.zoom(scales, getDeltaForTouches(deltaX, deltaY));
      if (this.lastCoordinates) {
        this.lastCoordinates = coords;
      }
      return;
    }

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
      return {
        viewport: {
          ...viewport,
          argumentBounds: getBounds(ARGUMENT_DOMAIN, scales, deltaX, 'pan', viewport),
          valueBounds: getBounds(getValueScaleName(viewport), scales, deltaY, 'pan', viewport),
        },
      };
    });
  }

  handleMouseUp = (scales) => {
    this.lastCoordinates = null;
    this.multiTouch = false;
    if (this.drawRectange) {
      this.setState(({ viewport, rectBox }) => {
        this.drawRectange = false;
        const scaleName = getValueScaleName(viewport);
        const argumentScale = scales[ARGUMENT_DOMAIN];
        const valueScale = scales[scaleName];
        return {
          rectBox: { x: 0, y: 0, width: 0, height: 0 },
          viewport: {
            ...viewport,
            argumentBounds: adjustBounds(
              argumentScale,
              [rectBox!.x, rectBox!.x + rectBox!.width],
              getPrevBounds(ARGUMENT_DOMAIN, argumentScale, viewport),
              'zoom',
            ),
            valueBounds: adjustBounds(
              valueScale,
              [rectBox!.y + rectBox!.height, rectBox!.y],
              getPrevBounds(scaleName, valueScale, viewport),
              'zoom',
            ),
          },
        };
      });
    }
  }

  zoom = (scales, delta) => {
    this.setState(({ viewport }) => {
      return {
        viewport: {
          ...viewport,
          argumentBounds: getBounds(ARGUMENT_DOMAIN, scales, delta, 'zoom', viewport),
          valueBounds: getBounds(getValueScaleName(viewport), scales, delta, 'zoom', viewport),
        },
      };
    });
  }

  handleScroll = scales => (e) => {
    e.preventDefault();
    this.zoom(scales, e.nativeEvent.wheelDelta);
  }

  render() {
    const { viewport, rectBox } = this.state;
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
                onOver={({ _, clientOffset }) => this.handleMouseMove(scales, clientOffset)}
                onDrop={() => this.handleMouseUp(scales)}
                onLeave={() => this.handleMouseUp(scales)}
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
                  onMouseDown: this.handleStart,
                  onTouchStart: this.handleStart,
                }}
              />}
          </TemplateConnector>
        </Template>

        <Template name="series">
          <TemplatePlaceholder />
            <svg>
              <rect
                x={rectBox!.x}
                y={rectBox!.y}
                width={rectBox!.width}
                height={rectBox!.height}
                fill="gray"
                opacity={0.3}
              />
            </svg>
        </Template>
      </Plugin >
    );
  }
}

export const ZoomAndPan: React.ComponentType<ZoomAndPanProps> = ZoomAndPanBase;
