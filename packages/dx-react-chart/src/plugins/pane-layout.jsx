import * as React from 'react';
import {
  Plugin,
  TemplateConnector,
  Template,
  Sizer,
} from '@devexpress/dx-react-core';
import { Pane } from './pane';

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
          <TemplateConnector>
            {(_, { changeBBox }) => (
              <Sizer
                style={{ flex: 1, zIndex: 1 }}
                onSizeChange={size => this.handleSizeUpdate(size, changeBBox)}
              >
                <Pane
                  height={height}
                  width={width}
                />
              </Sizer>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
