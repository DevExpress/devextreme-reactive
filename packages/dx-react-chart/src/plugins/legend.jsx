import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

export class Legend extends React.PureComponent {
  render() {
    const {
      markerComponent: Marker,
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
              argumentAxisName,
              colorDomain,
              items,
            }) => (
              <Root name={`legend-${placeholder}`}>
                {items(series, domains[argumentAxisName].domain)
                  .map(({ uniqueName, color }) => (
                    <Item key={uniqueName}>
                      <Marker name={uniqueName} color={color || colorDomain(uniqueName)} />
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

Legend.propTypes = {
  markerComponent: PropTypes.func.isRequired,
  labelComponent: PropTypes.func.isRequired,
  rootComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
  position: PropTypes.string,
};

Legend.defaultProps = {
  position: 'right',
};
