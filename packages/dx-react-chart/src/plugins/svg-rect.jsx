import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

export class Rect extends React.PureComponent {
  render() {
    const { placeholder, color } = this.props;
    return ((
      <Plugin name="Rect">
        <Template name="axis">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ layouts }) => {
                   const {
                      x, y, width, height,
                  } = layouts[placeholder];
                return ((
                  <rect x={x} y={y} width={width} height={height} fill={color} />
                ));
              }}
          </TemplateConnector>
        </Template>
      </Plugin>));
  }
}

Rect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Rect.defaultProps = {
  color: 'blue',
};
