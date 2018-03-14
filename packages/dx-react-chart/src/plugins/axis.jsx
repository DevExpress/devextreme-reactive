import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

import { calculateAxisCoords } from '@devexpress/dx-chart-core';

const createRefsHandler = (placeholder, setBBox) => (el) => {
  if (!el) {
    return;
  }
  const bBox = el.getBBox();
  setBBox(placeholder, bBox);
};

export class Axis extends React.PureComponent {
  render() {
    const {
      placeholder,
      name,
      rootComponent: Root,
      tickComponent: Tick,
      labelComponent: Label,
    } = this.props;
    return (
      <Plugin name="Axis">
        <Template name="canvas">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
                   domains, axes, setBBox, layouts,
               }) => {
                 const {
                    x, y, width, height,
                } = layouts[placeholder];

                const refsHandler = createRefsHandler(placeholder, setBBox);
                const domain = domains[name];
                const { orientation } = axes.find(axis => axis.name === name);

                const axesCoords = calculateAxisCoords(domain, orientation, width, height);

                return ((
                  <Root refsHandler={refsHandler} x={x} y={y}>
                    {axesCoords.ticks.map(({
                      text, x1, x2, y1, y2, xText, yText,
                    }) => (
                      <React.Fragment key={text}>
                        <Tick
                          x1={x1}
                          x2={x2}
                          y1={y1}
                          y2={y2}
                        />
                        <Label
                          text={text}
                          x={xText}
                          y={yText}
                        />
                      </React.Fragment>
                    ))}
                  </Root>));
              }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

Axis.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  rootComponent: PropTypes.func.isRequired,
  tickComponent: PropTypes.func.isRequired,
  labelComponent: PropTypes.func.isRequired,
};
