import * as React from 'react';
import * as PropTypes from 'prop-types';
import yoga from '@devexpress/dx-flex-layout';

import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

// eslint-disable-next-line react/prop-types
const LayoutElement = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);

const createRefsHandler = (placeholder, setBBox) => (el) => {
  if (!el) return;
  const { width, height } = el.getBBox();

  setBBox(placeholder, { width, height });
};

export class Legend extends React.PureComponent {
  render() {
    const {
      markerComponent: Marker,
      labelComponent: Label,
      position,
    } = this.props;
    const placeholder = position;
    return (
      <Plugin name="Legend">
        <Template name="canvas">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              series, layouts, addNodes, setBBox,
            }) => {
              const items = (
                <LayoutElement
                  name={`legend-${placeholder}`}
                  flexDirection={yoga.FLEX_DIRECTION_COLUMN}
                  flexWrap={yoga.WRAP_WRAP}
                  justifyContent={yoga.JUSTIFY_FLEX_START}
                >
                  {series.map(({ name }) => (
                    <LayoutElement
                      key={name}
                      flexDirection={yoga.FLEX_DIRECTION_ROW}
                      alignItems={yoga.ALIGN_CENTER}
                      name={`${name}-legend-root-${placeholder}`}
                    >
                      <Marker
                        name={`${name}-legend-marker-${placeholder}`}
                        x={
                          layouts[`${name}-legend-marker-${placeholder}`]
                            ? layouts[`${name}-legend-marker-${placeholder}`].x
                            : 0
                        }
                        y={
                          layouts[`${name}-legend-marker-${placeholder}`]
                            ? layouts[`${name}-legend-marker-${placeholder}`].y
                            : 0
                        }
                        margin={5}
                      />
                      <Label
                        margin={5}
                        x={
                          layouts[`${name}-legend-label-${placeholder}`]
                            ? layouts[`${name}-legend-label-${placeholder}`].x
                            : 0
                        }
                        y={
                          layouts[`${name}-legend-label-${placeholder}`]
                            ? layouts[`${name}-legend-label-${placeholder}`].y
                            : 0
                        }
                        refsHandler={createRefsHandler(
                          `${name}-legend-label-${placeholder}`,
                          setBBox,
                        )}
                        name={`${name}-legend-label-${placeholder}`}
                        text={name}
                        dominantBaseline="text-before-edge"
                        textAnchor="start"
                      />
                    </LayoutElement>
                  ))}
                </LayoutElement>
              );

              addNodes(items, placeholder);

              return items;
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

Legend.propTypes = {
  markerComponent: PropTypes.func.isRequired,
  labelComponent: PropTypes.func.isRequired,
  position: PropTypes.string,
};

Legend.defaultProps = {
  position: 'right',
};
