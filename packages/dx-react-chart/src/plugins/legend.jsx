import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { ARGUMENT_DOMAIN } from '@devexpress/dx-chart-core';
import { Marker } from '../templates/legend/marker';
import { withComponents } from '../utils';

class RawLegend extends React.PureComponent {
  render() {
    const {
      markerComponent: MarkerComponent,
      labelComponent: Label,
      rootComponent: Root,
      itemComponent: Item,
      position,
    } = this.props;
    const placeholder = position;
    return (
      <Plugin name="Legend">
        <Template name={placeholder}>
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              series,
              domains,
              colorDomain,
              items,
            }) => (
              <Root name={`legend-${placeholder}`}>
                {items(series, domains[ARGUMENT_DOMAIN].domain)
                  .map(({ uniqueName, color }) => (
                    <Item key={uniqueName}>
                      <MarkerComponent name={uniqueName} color={color || colorDomain(uniqueName)} />
                      <Label text={uniqueName} />
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
};

RawLegend.defaultProps = {
  position: 'right',
};

RawLegend.components = {
  rootComponent: 'Root',
  itemComponent: 'Item',
  markerComponent: 'Marker',
  labelComponent: 'Label',
};

export const Legend = withComponents({ Marker })(RawLegend);
