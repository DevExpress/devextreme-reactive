import * as React from 'react';
import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
  withComponents,
  Getters,
  PluginComponents,
} from '@devexpress/dx-react-core';
import { getLegendItems } from '@devexpress/dx-chart-core';
import { Marker } from '../templates/legend/marker';
import { LegendProps } from '../types';

class RawLegend extends React.PureComponent<LegendProps> {
  static defaultProps: Partial<LegendProps> = {
    position: 'right',
    getItems: ({ series }: Getters) => getLegendItems(series),
  };
  static components: PluginComponents = {
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

export const Legend: React.ComponentType<LegendProps> = withComponents({ Marker })(RawLegend);
