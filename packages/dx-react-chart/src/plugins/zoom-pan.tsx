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
} from '@devexpress/dx-react-core';
import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN, adjustLayout, getRootOffset, getDeltaForTouches, offsetCoordinates,
  isCoords, getBounds, pan, zoom, adjustBounds, getPrevBounds,
} from '@devexpress/dx-chart-core';
import { ZoomAndPanProps, ZoomAndPanState } from '../types';

type LastCoordinates = {x: number, y: number} | null;

class ZoomAndPanBase extends React.PureComponent<ZoomAndPanProps, ZoomAndPanState> {
  lastCoordinates: LastCoordinates = null;
  rectangle = { x: 0, y: 0 };
  drawRectange = false;
  offset: number[] = [0, 0];
  multiTouch = false;
  constructor(props: ZoomAndPanProps) {
    super(props);

    this.state = {
      viewport: props.viewport || props.defaultViewport,
      rectBox: { x: 0, y: 0, width: 0, height: 0 },
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }

  static getDerivedStateFromProps(props: ZoomAndPanProps, state: ZoomAndPanState): ZoomAndPanState {
    return {
      viewport: props.viewport !== undefined ? props.viewport : state.viewport,
      rectBox: state.rectBox,
    };
  }

  handleTouchMove = (scales, deltaX, deltaY) => {
    this.zoom(scales, getDeltaForTouches(deltaX, deltaY));
  }

  handleStart = (e) => {
    this.offset = getRootOffset(e.currentTarget);
    if (e.nativeEvent.shiftKey) {
      this.drawRectange = true;
    }
    if (e.targetTouches.length === 2) {
      this.multiTouch = true;
    }
  }

  handleMouseMove = (scales, clientOffset) => {
    const coords = offsetCoordinates(clientOffset, this.offset);
    if (!isCoords(this.lastCoordinates)) {
      this.lastCoordinates = coords;
      if (this.drawRectange) {
        this.rectangle = coords;
      }
      return;
    }
    const deltaX = coords.x - this.lastCoordinates!.x;
    const deltaY = coords.y - this.lastCoordinates!.y;

    if (this.multiTouch) {
      this.handleTouchMove(scales, deltaX, deltaY);
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
      const scaleName = viewport && viewport.scaleName || VALUE_DOMAIN;
      return {
        viewport: {
          ...viewport,
          argumentBounds: getBounds(ARGUMENT_DOMAIN, scales, viewport, deltaX, pan),
          valueBounds: getBounds(scaleName, scales, viewport, deltaY, pan),
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
        const scaleName = viewport && viewport.scaleName || VALUE_DOMAIN;
        const argumentScale = scales[ARGUMENT_DOMAIN];
        const valueScale = scales[scaleName];
        return {
          rectBox: { x: 0, y: 0, width: 0, height: 0 },
          viewport: {
            ...viewport,
            argumentBounds: adjustBounds(
              argumentScale,
              [rectBox!.x, rectBox!.x + rectBox!.width],
              getPrevBounds(ARGUMENT_DOMAIN, viewport, argumentScale),
            ),
            valueBounds: adjustBounds(
              valueScale,
              [rectBox!.y + rectBox!.height, rectBox!.y],
              getPrevBounds(scaleName, viewport, valueScale)),
          },
        };
      });
    }
  }

  zoom = (scales, delta) => {
    this.setState(({ viewport }) => {
      const scaleName = viewport && viewport.scaleName || VALUE_DOMAIN;
      return {
        viewport: {
          ...viewport,
          argumentBounds: getBounds(ARGUMENT_DOMAIN, scales, viewport, delta, zoom),
          valueBounds: getBounds(scaleName, scales, viewport, delta, zoom),
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
