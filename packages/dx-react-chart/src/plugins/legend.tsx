import * as React from 'react';
import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
  withComponents,
  PluginComponents,
  Getters,
} from '@devexpress/dx-react-core';
import { getLegendItems } from '@devexpress/dx-chart-core';
import { Marker } from '../templates/legend/marker';

const defaultProps = {
  position: 'right',
  getItems: ({ series }: Getters) => getLegendItems(series),
};
type RawLegendDefaultProps = Readonly<typeof defaultProps>;
type RawLegendProps = {
  markerComponent: any,
  labelComponent: any,
  rootComponent: any,
  itemComponent: any,
} & Partial<RawLegendDefaultProps>;

class RawLegend extends React.PureComponent<RawLegendProps> {
  static defaultProps = defaultProps;
  static components: PluginComponents;
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
        <Template name={placeholder!}>
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

RawLegend.components = {
  rootComponent: 'Root',
  itemComponent: 'Item',
  markerComponent: 'Marker',
  labelComponent: 'Label',
};

export const Legend = withComponents({ Marker })(RawLegend);
