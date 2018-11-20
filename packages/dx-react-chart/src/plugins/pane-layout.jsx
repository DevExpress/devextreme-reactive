import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
  Sizer,
} from '@devexpress/dx-react-core';

const DIV_STYLE = {
  flex: 1, zIndex: 1, position: 'relative', width: '100%',
};

const SVG_STYLE = {
  position: 'absolute', left: 0, top: 0, overflow: 'visible',
};

const SizerContainer = ({ children }) => (
  <div style={DIV_STYLE}>{children}</div>
);

SizerContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export class PaneLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleSizeUpdate = (size, changeBBox) => {
      changeBBox({ placeholder: 'pane', bBox: size });
    };
  }

  render() {
    return (
      <Plugin name="PaneLayout">
        <Template name="canvas">
          {params => (
            <TemplateConnector>
              {({ layouts }, { changeBBox }) => {
                const { width, height } = layouts.pane;
                return (
                  <Sizer
                    containerComponent={SizerContainer}
                    onSizeChange={size => this.handleSizeUpdate(size, changeBBox)}
                  >
                    <svg
                      {...params}
                      width={width}
                      height={height}
                      style={SVG_STYLE}
                    >
                      <TemplatePlaceholder name="series" />
                    </svg>
                  </Sizer>
                );
              }
                }
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}
