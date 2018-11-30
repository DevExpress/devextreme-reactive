import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
  withComponents,
} from '@devexpress/dx-react-core';
import { getLegendItems } from '@devexpress/dx-chart-core';
import { Marker } from '../templates/legend/marker';

class RawLegend extends React.PureComponent {
  render() {
    const {
      markerComponent: MarkerComponent,
      labelComponent: Label,
      rootComponent: Root,
      itemComponent: Item,
      position,
      getItems,
    } = this.props;
    const placeholder = position;
    return (
      <Plugin name="Legend">
        <Template name={placeholder}>
          <TemplatePlaceholder />
          <TemplateConnector>
            {getters => (
              <Root name={`legend-${placeholder}`}>
                {getItems(getters).map(({ text, color }) => (
                  <Item key={text}>
                    <MarkerComponent name={text} color={color} />
                    <Label text={text} />
                  </Item>
                ))}
              </Root>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

RawLegend.propTypes = {
  markerComponent: PropTypes.func.isRequired,
  labelComponent: PropTypes.func.isRequired,
  rootComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
  position: PropTypes.string,
  getItems: PropTypes.func,
};

RawLegend.defaultProps = {
  position: 'right',
  getItems: ({ series }) => getLegendItems(series),
};

RawLegend.components = {
  rootComponent: 'Root',
  itemComponent: 'Item',
  markerComponent: 'Marker',
  labelComponent: 'Label',
};

export const Legend = withComponents({ Marker })(RawLegend);
