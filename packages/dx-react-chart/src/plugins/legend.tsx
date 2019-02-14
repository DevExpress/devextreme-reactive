import * as React from 'react';
import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
  withComponents,
  Getters,
} from '@devexpress/dx-react-core';
import { getLegendItems } from '@devexpress/dx-chart-core';
import { Marker } from '../templates/legend/marker';
import { RawLegendProps } from '../types';

class RawLegend extends React.PureComponent<RawLegendProps> {
  static defaultProps = {
    position: 'right',
    getItems: ({ series }: Getters) => getLegendItems(series),
  };
  static components: {
    rootComponent: 'Root',
    itemComponent: 'Item',
    markerComponent: 'Marker',
    labelComponent: 'Label',
  };
  render() {
    const {
      markerComponent: MarkerComponent,
      labelComponent: Label,
      rootComponent: Root,
      itemComponent: Item,
      position,
      getItems,
    } = this.props;
    const placeholder = position!;
    return (
      <Plugin name="Legend">
        <Template name={placeholder}>
          <TemplatePlaceholder />
          <TemplateConnector>
            {getters => (
              <Root name={`legend-${placeholder}`}>
                {getItems!(getters).map(({ text, color }) => (
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

export const Legend: React.ComponentType<RawLegendProps> = withComponents({ Marker })(RawLegend);
