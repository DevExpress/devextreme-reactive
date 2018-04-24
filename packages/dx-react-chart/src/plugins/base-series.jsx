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
        rootComponent: Root,
        point,
        barWidth,
        groupWidth,
        ...restProps
      } = this.props;
      return (
        <Plugin name={pluginName}>
          <Template name="canvas">
            <TemplatePlaceholder />
            <TemplateConnector>
              {({
                series,
                domains,
                stacks,
                data,
                argumentAxisName,
                layouts,
              }) => {
                const {
                  x, y,
                } = layouts[placeholder];
                const { size } = point;
                const attributes = seriesAttributes(
                    data,
                    series,
                    name,
                    domains,
                    argumentAxisName,
                    layouts[placeholder],
                    stacks,
                    pathType,
                    size,
                    groupWidth,
                    barWidth,
                  );
                return (
                  <Root x={x} y={y}>
                    <WrappedComponent
                      attributes={attributes}
                      {...restProps}
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
    point: PropTypes.object,
    barWidth: PropTypes.number,
    groupWidth: PropTypes.number,
  };
  Component.defaultProps = {
    placeholder: 'pane',
    point: { size: 7 },
    barWidth: 0.9,
    groupWidth: 0.7,
  };
  return Component;
};
