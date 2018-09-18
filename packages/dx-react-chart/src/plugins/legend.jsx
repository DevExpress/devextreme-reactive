import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
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
              colorDomain,
            }) => (
              <Root name={`legend-${placeholder}`}>
                {colorDomain.domain().map((domainName) => {
                  const { name, color } = series.find(({
                    uniqueName,
                  }) => uniqueName === domainName);
                  return (
                    <Item key={domainName}>
                      <MarkerComponent name={name} color={color || colorDomain(domainName)} />
                      <Label text={name} />
                    </Item>
                  );
                })}
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
