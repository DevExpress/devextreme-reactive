import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

import { axisCoordinates, HORIZONTAL } from '@devexpress/dx-chart-core';

export class Axis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xCorrection: 0,
      yCorrection: 0,
    };
    this.createRefsHandler = this.createRefsHandler.bind(this);
  }
  createRefsHandler(placeholder, changeBBox, orientation) {
    return (el) => {
      if (!el) {
        return;
      }
      const {
        width, height, x, y,
      } = el.getBBox();

      if (width === this.state.width && height === this.state.height) return;
      changeBBox({
        placeholder,
        bBox: {
          width,
          height,
        },
      });
      this.setState({
        width,
        height,
        xCorrection: orientation !== HORIZONTAL ? x : 0,
        yCorrection: orientation !== HORIZONTAL ? 0 : y,
      });
    };
  }
  calculateLayout(width, height, defaultWidth, defaultHeight) {
    const calculatedWidth = width || defaultWidth;
    const calculatedHeight = height || defaultHeight;
    const {
      width: containerWidth,
      height: containerHeight,
    } = (this.node && this.node.getBoundingClientRect()) || {};

    return {
      width: containerWidth || calculatedWidth,
      height: containerHeight || calculatedHeight,
    };
  }
  render() {
    const {
      tickSize,
      position,
      name,
      indentFromAxis,
      isArgumentAxis,
      rootComponent: Root,
      tickComponent: Tick,
      labelComponent: Label,
      lineComponent: Line,
    } = this.props;
    return (
      <Plugin name="Axis">
        <Template name={`${position}-axis`}>
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              domains,
              argumentAxisName,
              layouts,
              width: containerWidth,
              height: containerHeight,
             }, { changeBBox }) => {
              const placeholder = `${position}-axis`;
              const domain = isArgumentAxis ? domains[argumentAxisName] : domains[name];
              const { orientation } = domain;
              const { width: widthCalculated, height: heightCalculated } = layouts[placeholder] ||
                    { width: containerWidth, height: containerHeight };

              const {
                width: widthPostCalculated,
                height: heightPostCalculated,
              } = this.calculateLayout(
                widthCalculated,
                heightCalculated,
                containerWidth,
                containerHeight,
              );


              const coordinates = axisCoordinates(
                domain,
                position,
                widthPostCalculated,
                heightPostCalculated,
                tickSize,
                indentFromAxis,
              );

              return (
                <div
                  style={{
                    position: 'relative',
                    width: orientation === 'horizontal' ? undefined : widthCalculated,
                    height: orientation === 'horizontal' ? heightCalculated : null,
                    flexGrow: orientation === 'horizontal' ? 1 : undefined,
                  }}
                  ref={(node) => { this.node = node; }}
                >
                  <svg
                    width={widthPostCalculated}
                    height={heightPostCalculated}
                    style={{
                      position: 'absolute', left: 0, top: 0, overflow: 'visible',
                    }}
                  >
                    <Root
                      refsHandler={this.createRefsHandler(
                        placeholder,
                        changeBBox,
                        orientation,
                      )}
                      x={-this.state.xCorrection}
                      y={-this.state.yCorrection}
                    >
                      {
                      coordinates.ticks.map(({
                        x1, x2, y1, y2, text,
                      }) => (<Tick
                        key={text}
                        x1={x1}
                        x2={x2}
                        y1={y1}
                        y2={y2}
                      />))
                    }
                      <Line
                        width={widthPostCalculated}
                        height={heightPostCalculated}
                        orientation={orientation}
                      />
                      {coordinates.ticks.map(({
                      text,
                      xText,
                      yText,
                      dominantBaseline,
                      textAnchor,
                    }) => (
                      <React.Fragment key={text}>
                        <Label
                          text={text}
                          x={xText}
                          y={yText}
                          dominantBaseline={dominantBaseline}
                          textAnchor={textAnchor}
                        />
                      </React.Fragment>
                    ))}
                    </Root>
                  </svg>
                </div>
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

Axis.propTypes = {
  name: PropTypes.string,
  isArgumentAxis: PropTypes.bool,
  rootComponent: PropTypes.func.isRequired,
  tickComponent: PropTypes.func.isRequired,
  labelComponent: PropTypes.func.isRequired,
  lineComponent: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  tickSize: PropTypes.number,
  indentFromAxis: PropTypes.number,
};

Axis.defaultProps = {
  tickSize: 5,
  indentFromAxis: 10,
  name: undefined,
  isArgumentAxis: false,
};
