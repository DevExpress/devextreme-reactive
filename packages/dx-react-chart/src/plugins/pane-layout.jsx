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
  render() {
    return (
      <Plugin name="PaneLayout">
        <Template name="canvas">
          <TemplateConnector>
            {(_, { changeBBox }) => (
              <Sizer>
                {({ width, height }) => (
                  <Pane
                    changeBBox={changeBBox}
                    width={width}
                    height={height}
                  />
                )}
              </Sizer>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
