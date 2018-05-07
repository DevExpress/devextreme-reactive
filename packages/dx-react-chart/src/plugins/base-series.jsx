import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { seriesAttributes } from '@devexpress/dx-chart-core';

export const baseSeries = (WrappedComponent, pluginName, pathType) => {
  class Component extends React.PureComponent {
    render() {
      const {
        placeholder,
        name,
        ...restProps
      } = this.props;
      return (
        <Plugin name={pluginName}>
          <Template name="series">
            <TemplatePlaceholder />
            <TemplateConnector>
              {({
                series,
                domains,
                data,
                argumentAxisName,
                layouts,
                width,
                height,
               }) => {
                const attributes = seriesAttributes(
                  data,
                  series,
                  name,
                  domains,
                  argumentAxisName,
                  layouts.pane || { width, height },
                  pathType,
                );
                return (
                  <WrappedComponent attributes={attributes} {...restProps} />
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
  };
  Component.defaultProps = {
    placeholder: 'pane',
  };
  return Component;
};
