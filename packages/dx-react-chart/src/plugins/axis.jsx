import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

import { axisCoordinates } from '@devexpress/dx-chart-core';

const getPlaceholder = (orientation, position) =>
  (orientation === 'horizontal' ? `${position}-center` : `center-${position}`);

const isEqual = (firstBBox, secondBBox) =>
  firstBBox.width === secondBBox.width && firstBBox.height === secondBBox.height;

export class Axis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      bBox: { x: 0, y: 0 },
      correctionX: 0,
      correctionY: 0,
    };
    this.createRefsHandler = this.createRefsHandler.bind(this);
  }
  createRefsHandler(placeholder, setBBox, orientation) {
    return (el) => {
      if (!el) {
        return;
      }
      const bBox = el.getBBox();
      this.setState((prevState) => {
        if (!(isEqual(prevState.bBox, bBox))) {
          setBBox(placeholder, bBox);
          return {
            bBox,
            correctionX: orientation === 'horizontal' ? 0 : bBox.x,
            correctionY: orientation === 'horizontal' ? bBox.y : 0,
          };
        }
        return null;
      });
    };
  }
  render() {
    const {
      position,
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
                   domains, setBBox, layouts,
               }) => {
                 const { orientation } = domains[name];
                 const placeholder = getPlaceholder(orientation, position);
                 const {
                    x, y, width, height,
                } = layouts[placeholder];

                const refsHandler = this.createRefsHandler(placeholder, setBBox, orientation);

                const coordinates = axisCoordinates(
                  domains[name],
                  position,
                  width,
                  height,
                );

                return ((
                  <Root
                    refsHandler={refsHandler}
                    x={x - this.state.correctionX}
                    y={y - this.state.correctionY}
                  >
                    {coordinates.ticks.map(({
                      text, x1, x2, y1, y2, xText, yText, alignmentBaseline, textAnchor,
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
                          alignmentBaseline={alignmentBaseline}
                          textAnchor={textAnchor}
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
  rootComponent: PropTypes.func.isRequired,
  tickComponent: PropTypes.func.isRequired,
  labelComponent: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
};
