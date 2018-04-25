import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

const LayoutElement = ({
  // eslint-disable-next-line react/prop-types
  children, refsHandler, ...restProps
}) => (
  <div
    ref={refsHandler}
    style={{
    display: 'flex',
    ...restProps,
    }}
  >{children}
  </div>
);

const createRefsHandler = (placeholder, setBBox) => (el) => {
  if (!el) return;
  const { width, height } = el.getBoundingClientRect();

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
        <Template name={placeholder}>
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              series, setBBox,
            }) => (
              <LayoutElement
                name={`legend-${placeholder}`}
                flexDirection="column"
                refsHandler={createRefsHandler(
                    `${placeholder}`,
                    setBBox,
                  )}
              >
                {series.map(({ name }) => (
                  <LayoutElement
                    key={name}
                    flexDirection="row"
                    alignItems="center"
                    name={`${name}-legend-root-${placeholder}`}
                  >
                    <Marker
                      name={`${name}-legend-marker-${placeholder}`}
                      margin={5}
                    />
                    <Label
                      margin={5}
                      refsHandler={() => {}}
                      name={`${name}-legend-label-${placeholder}`}
                      text={name}
                      dominantBaseline="text-before-edge"
                      textAnchor="start"
                    />
                  </LayoutElement>
                  ))}
              </LayoutElement>
              )}
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
