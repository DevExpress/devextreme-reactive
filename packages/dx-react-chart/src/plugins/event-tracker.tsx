import * as React from 'react';
import {
  Plugin,
  Template,
  Getter,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { buildEventHandlers } from '@devexpress/dx-chart-core';
import { EventTrackerProps } from '../types';

const wrapToList = arg => (arg ? [arg] : []);

const EVENT_NAME_TO_REACT_MAP = {
  click: 'onClick',
  mousemove: 'onMouseMove',
  mouseleave: 'onMouseLeave',
  touchmove: 'onTouchMove',
  touchleave: 'onTouchLeave',
  pointermove: 'onPointerMove',
  pointerleave: 'onPointerLeave',
};

// Translates event names from common space to React.
// https://developer.mozilla.org/en-US/docs/Web/Events
const translateEventNames = (handlers) => {
  const result = {};
  Object.entries(handlers).forEach(([name, handler]) => {
    result[EVENT_NAME_TO_REACT_MAP[name]] = handler;
  });
  return result;
};

/** @internal */
export class EventTracker extends React.PureComponent<EventTrackerProps> {
  render() {
    const { onClick, onPointerMove } = this.props;
    return (
      <Plugin name="EventTracker">
        <Getter name="clickHandlers" value={wrapToList(onClick)} />
        <Getter name="pointerMoveHandlers" value={wrapToList(onPointerMove)} />
        <Template name="canvas">
          <TemplateConnector>
            {({ series, clickHandlers, pointerMoveHandlers }) => {
              const handlers = buildEventHandlers(series, { clickHandlers, pointerMoveHandlers });
              return <TemplatePlaceholder params={translateEventNames(handlers)} />;
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
