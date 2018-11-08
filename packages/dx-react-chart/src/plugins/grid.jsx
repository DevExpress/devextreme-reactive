import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  axisCoordinates, TOP, LEFT, ARGUMENT_DOMAIN, getValueDomainName,
} from '@devexpress/dx-chart-core';
import { Line } from '../templates/grid/line';
import { withPatchedProps, withComponents } from '../utils';

class RawGrid extends React.PureComponent {
  render() {
    const {
      name,
      lineComponent: LineComponent,
      ...restProps
    } = this.props;
    return (
      <Plugin name="Grid">
        <Template name="series">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ scales, layouts }) => {
              const scale = scales[name];
              if (!scale) {
                return null;
              }

              const isHorizontal = name === ARGUMENT_DOMAIN;
              const {
                width, height,
              } = layouts.pane;

              const ticks = axisCoordinates({
                scale,
                orientation: isHorizontal ? 'horizontal' : 'vertical',
                position: isHorizontal ? TOP : LEFT,
                tickSize: 0,
              });

              return ((
                <React.Fragment>
                  {ticks.map(({
                    x1, x2, y1, y2, key,
                  }) => (
                    <LineComponent
                      key={key}
                      x1={isHorizontal ? x1 : width}
                      x2={x2}
                      y1={isHorizontal ? height : y1}
                      y2={y2}
                      {...restProps}
                    />
                  ))}
                </React.Fragment>
              ));
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

RawGrid.propTypes = {
  name: PropTypes.string.isRequired,
  lineComponent: PropTypes.func.isRequired,
};

RawGrid.components = {
  lineComponent: 'Line',
};

export const Grid = withComponents({ Line })(RawGrid);

export const ArgumentGrid = withPatchedProps(props => ({
  ...props,
  name: ARGUMENT_DOMAIN,
}))(Grid);

export const ValueGrid = withPatchedProps(props => ({
  ...props,
  name: getValueDomainName(props.name),
}))(Grid);

ArgumentGrid.components = Grid.components;
ValueGrid.components = Grid.components;
