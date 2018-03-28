import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { getSeriesAttributes } from '@devexpress/dx-chart-core';

export const baseSeries = (WrappedComponent, pluginName, pathType) => {
  class Component extends React.PureComponent {
    render() {
      const {
        placeholder,
        name,
        rootComponent: Root,
      } = this.props;
      return (
        <Plugin name={pluginName}>
          <Template name="canvas">
            <TemplatePlaceholder />
            <TemplateConnector>
              {({
                series,
                domains,
                data,
                argumentAxisName,
                layouts,
              }) => {
                const {
                  x, y,
                } = layouts[placeholder];
                const attributes = getSeriesAttributes(
                    data,
                    series,
                    name,
                    domains,
                    argumentAxisName,
                    layouts[placeholder],
                    pathType,
                  );
                return (
                  <Root x={x} y={y}>
                    <WrappedComponent
                      attributes={attributes}
                      {...this.props}
                    />
                  </Root>
                );
              }}
            </TemplateConnector>
          </Template>
        </Plugin>
      );
    }
  }
  Component.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    rootComponent: PropTypes.func.isRequired,
  };
  Component.defaultProps = {
    placeholder: 'center-center',
  };
  return Component;
};
