import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
  withComponents,
} from '@devexpress/dx-react-core';
import { ARGUMENT_DOMAIN, getValueDomainName, getGridCoordinates } from '@devexpress/dx-chart-core';
import { Line } from '../templates/grid/line';
import { withPatchedProps } from '../utils';

class RawGrid extends React.PureComponent {
  render() {
    const { name, lineComponent: LineComponent } = this.props;
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

              const { width, height } = layouts.pane;
              const ticks = getGridCoordinates({ name, scale });
              return ((
                <React.Fragment>
                  {ticks.map(({
                    key, x, dx, y, dy,
                  }) => (
                    <LineComponent
                      key={key}
                      x1={x}
                      x2={x + dx * width}
                      y1={y}
                      y2={y + dy * height}
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
