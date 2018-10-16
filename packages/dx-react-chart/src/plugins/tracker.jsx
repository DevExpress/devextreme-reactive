import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Template,
  Getter,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';

const getEventCoords = (e) => {
  const { pageXOffset, pageYOffset } = window; // eslint-disable-line no-undef
  const { left, top } = e.currentTarget.getBoundingClientRect();
  return [
    e.clientX - left - pageXOffset,
    e.clientY - top - pageYOffset,
  ];
};

const buildEventHandler = ({
  series: seriesList,
  getSeriesPoints, data, scales,
  stacks, scaleExtension,
}, handlers) => {
  let hitTesters = null;

  const createHitTesters = () => {
    const obj = {};
    seriesList.forEach((seriesItem) => {
      // TODO: Calculate series coodinates in a separate getter and remove `getSeriesPoints`.
      const coordinates = getSeriesPoints(seriesItem, data, scales, stacks, scaleExtension);
      obj[seriesItem.symbolName] = seriesItem.createHitTester(coordinates);
    });
    return obj;
  };

  return (e) => {
    const coords = getEventCoords(e);
    hitTesters = hitTesters || createHitTesters();
    const targets = [];
    seriesList.forEach((seriesItem) => {
      const status = hitTesters[seriesItem.symbolName](coords);
      if (status) {
        targets.push({ name: seriesItem.name, ...status });
      }
    });
    const arg = { coords, targets };
    handlers.forEach(handler => handler(arg));
  };
};

const wrapToList = arg => (arg ? [arg] : []);

export class Tracker extends React.PureComponent {
  render() {
    const { onClick, onPointerMove } = this.props;
    return (
      <Plugin name="Tracker">
        <Getter name="clickHandlers" value={wrapToList(onClick)} />
        <Getter name="pointerMoveHandlers" value={wrapToList(onPointerMove)} />
        <Template name="canvas">
          <TemplateConnector>
            {(getters) => {
              const { clickHandlers, pointerMoveHandlers } = getters;
              const handlers = {};
              if (clickHandlers.length) {
                handlers.onClick = buildEventHandler(getters, clickHandlers);
              }
              if (pointerMoveHandlers.length) {
                handlers.onPointerMove = buildEventHandler(getters, pointerMoveHandlers);
              }
              return <TemplatePlaceholder params={handlers} />;
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

Tracker.propTypes = {
  onClick: PropTypes.func,
  onPointerMove: PropTypes.func,
};

Tracker.defaultProps = {
  onClick: undefined,
  onPointerMove: undefined,
};
