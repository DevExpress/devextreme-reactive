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
            }) => (
              <Root name={`legend-${placeholder}`} >
                {series.map(({ name }) => (
                  <Item key={name} >
                    <Marker margin={5} name={name} />
                    <Label margin={5} text={name} />
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
