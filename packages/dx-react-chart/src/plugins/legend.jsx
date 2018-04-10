import * as React from 'react';
import * as PropTypes from 'prop-types';
import yoga from '@devexpress/dx-flex-layout';

import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

const LayoutElement = () => null;

const placeholders = {};

const createRefsHandler = (placeholder, setBBox) => (el) => {
  if (!el) {
    return;
  }
  const bBox = el.getBBox();
  if (placeholders[placeholder] && bBox.width === placeholders[placeholder].width) {
    return;
  }
  placeholders[placeholder] = bBox;
  setBBox(placeholder, bBox);
};

export class Legend extends React.PureComponent {
  render() {
    const {
      rootComponent: Root,
      markerComponent: Marker,
      labelComponent: Label,
      placeholder,
    } = this.props;
    return (
      <Plugin name="Legend">
        <Template name="canvas">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              series, layouts, addNodes, setBBox,
             }) => {
              const items = series.map(({ name }) =>
              ((
                <Root
                  key={name}
                  x={0}
                  y={0}
                  flexDirection={yoga.FLEX_DIRECTION_ROW}
                  alignItems={yoga.ALIGN_CENTER}
                  name={`${name}-legend-root-${placeholder}`}
                  refsHandler={() => {}}
                >
                  <Marker
                    name={`${name}-legend-marker-${placeholder}`}
                    x={layouts[`${name}-legend-marker-${placeholder}`] ? layouts[`${name}-legend-marker-${placeholder}`].x : 0}
                    y={layouts[`${name}-legend-marker-${placeholder}`] ? layouts[`${name}-legend-marker-${placeholder}`].y : 0}
                    width={10}
                    height={10}
                    margin={5}
                  />
                  <Label
                    margin={5}
                    x={layouts[`${name}-legend-label-${placeholder}`] ? layouts[`${name}-legend-label-${placeholder}`].x : 0}
                    y={layouts[`${name}-legend-label-${placeholder}`] ? layouts[`${name}-legend-label-${placeholder}`].y : 0}
                    refsHandler={createRefsHandler(`${name}-legend-label-${placeholder}`, setBBox)}
                    name={`${name}-legend-label-${placeholder}`}
                    text={name}
                    dominantBaseline="text-before-edge"
                    alignmentBaseline="text-before-edge"
                    textAnchor="start"

                    bBoxHandler={(bBoxes, node) => {
                      node.setWidth(bBoxes[`${name}-legend-label-${placeholder}`] ? bBoxes[`${name}-legend-label-${placeholder}`].width : 0);
                      node.setHeight(bBoxes[`${name}-legend-label-${placeholder}`] ? bBoxes[`${name}-legend-label-${placeholder}`].height : 0);
                    }}
                  />
                </Root>)));
                  addNodes(
                    <LayoutElement
                      name={`legend-${placeholder}`}
                      flexDirection={yoga.FLEX_DIRECTION_COLUMN}
                      flexWrap={yoga.WRAP_WRAP}
                      justifyContent={yoga.JUSTIFY_CENTER}
                    >
                      {items}
                    </LayoutElement>,
                  placeholder,
                  );
                return (
                  <Root x={0} y={0} refsHandler={createRefsHandler(placeholder, setBBox)}>
                    {items}
                  </Root>);
            }
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
  placeholder: PropTypes.string,
};

Legend.defaultProps = {
  placeholder: 'top',
};
