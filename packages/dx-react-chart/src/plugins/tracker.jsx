import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Template,
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
}, handler) => {
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
    seriesList.forEach((seriesItem) => {
      const status = hitTesters[seriesItem.symbolName](coords);
      if (status) {
        handler({ ...seriesItem, point: status.point });
      }
    });
  };
};

export class Tracker extends React.PureComponent {
  render() {
    const { onClick } = this.props;
    if (!onClick) {
      return null;
    }
    return (
      <Plugin name="Tracker">
        <Template name="canvas">
          <TemplateConnector>
            {(getters) => {
              const handlers = {
                onClick: buildEventHandler(getters, onClick),
              };
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
};

Tracker.defaultProps = {
  onClick: undefined,
};
