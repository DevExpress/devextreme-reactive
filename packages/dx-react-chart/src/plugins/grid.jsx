import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { scaleLinear } from 'd3-scale';

export class Grid extends React.PureComponent {
  render() {
    const {
      placeholder,
      name,
      rootComponent: Root,
      lineComponent: Line,
    } = this.props;
    return (
      <Plugin name="Grid">
        <Template name="canvas">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              domains,
              layouts,
            }) => {
              const { domain, orientation } = domains[name];
              const {
                x, y, width, height,
              } = layouts[placeholder];

              const gridCoordinates = () => {
                const scale = scaleLinear()
                  .domain(domain)
                  .range(orientation === 'horizontal' ? [0, width] : [height, 0]);
                return scale.ticks().map(tick =>
                    (orientation === 'horizontal'
                      ? {
                          x1: scale(tick),
                          x2: scale(tick),
                          y1: 0,
                          y2: height,
                        }
                      : {
                          x1: 0,
                          x2: width,
                          y1: scale(tick),
                          y2: scale(tick),
                        }));
              };


              return ((
                <Root x={x} y={y}>
                  {gridCoordinates().map(({
                      x1, x2, y1, y2,
                    }, i) => (
                      <Line
                        t // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        x1={x1}
                        x2={x2}
                        y1={y1}
                        y2={y2}
                      />
                    ))}
                </Root>));
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

Grid.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  rootComponent: PropTypes.func.isRequired,
  lineComponent: PropTypes.func.isRequired,
};

Grid.defaultProps = {
  placeholder: 'center-center',
};
