import * as React from 'react';
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
  Sizer,
} from '@devexpress/dx-react-core';

/* eslint-disable-next-line react/prefer-stateless-function */
export class PaneLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      width: 800,
      height: 600,
    };
  }

  handleSizeUpdate({ width, height }, changeBBox) {
    this.setState({ width, height });
    changeBBox({ placeholder: 'pane', bBox: { width, height } });
  }

  render() {
    const {
      width,
      height,
    } = this.state;

    return (
      <Plugin name="PaneLayout">
        <Template name="canvas">
          {params => (
            <TemplateConnector>
              {(_, { changeBBox }) => (
                <Sizer
                  style={{ flex: 1, zIndex: 1 }}
                  onSizeChange={size => this.handleSizeUpdate(size, changeBBox)}
                >
                  <div style={{ width: '100%' }}>
                    <svg
                      {...params}
                      width={width}
                      height={height}
                      style={{
                        position: 'absolute', left: 0, top: 0, overflow: 'visible',
                      }}
                    >
                      <TemplatePlaceholder name="series" />
                    </svg>
                  </div>
                </Sizer>
              )}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}
