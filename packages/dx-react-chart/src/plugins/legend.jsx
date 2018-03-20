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
      rootComponent: Root,
      markerComponent: Marker,
      labelComponent: Label,
    } = this.props;
    return (
      <Plugin name="Legend">
        <Template name="canvas">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ series }) => series.map(({ valueField }) =>
              ((
                <Root key={valueField} refsHandler={() => {}} x={0} y={0}>
                  <Marker x={0} y={0} width={20} height={20} />
                  <Label x={0} y={0} text={valueField} alignmentBaseline="middle" textAnchor="middle" />
                </Root>)))
            }
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

Legend.propTypes = {
  rootComponent: PropTypes.func.isRequired,
  markerComponent: PropTypes.func.isRequired,
  labelComponent: PropTypes.func.isRequired,
};
