import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

const createRefsHandler = (placeholder, setBBox) => (el) => {
  if (!el) return;
  const { width, height } = el.getBBox();
  let setWidth;
  let setHeight;

  if (placeholder === 'left' || placeholder === 'right') {
    setWidth = width;
    setHeight = 0;
  } else if (placeholder === 'top' || placeholder === 'bottom') {
    setWidth = 0;
    setHeight = height;
  }
  setBBox(placeholder, { width: setWidth, height: setHeight });
};

export class Rect extends React.PureComponent {
  render() {
    const {
      placeholder,
      color,
      width: selfWidth,
      height: selfHeight,
    } = this.props;
    return (
      <Plugin name="Rect">
        <Template name="canvas">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ layouts, addNodes, setBBox }) => {
              const {
                x, y, width, height,
              } = layouts[placeholder];

              const rect = (
                <rect
                  x={x}
                  y={y}
                  width={selfWidth}
                  height={selfHeight}
                  fill={color}
                />
              );
              addNodes(rect, placeholder);
              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={color}
                  ref={createRefsHandler(placeholder, setBBox)}
                />
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

Rect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

Rect.defaultProps = {
  color: 'blue',
  width: undefined,
  height: undefined,
};
