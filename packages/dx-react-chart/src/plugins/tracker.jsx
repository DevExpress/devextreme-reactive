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

const buildEventHandler = ({ series: seriesList }, handler) => (e) => {
  const coords = getEventCoords(e);
  seriesList.forEach((/* seriesItem */) => {
    // TODO: Hit test series.
  });
  handler(coords);
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
