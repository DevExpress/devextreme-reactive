import * as React from 'react';
import {
  Plugin,
  TemplateConnector,
  Template,
  Sizer,
} from '@devexpress/dx-react-core';
import { Pane } from './pane';

export class PaneLayout extends React.PureComponent {
  render() {
    return (
      <Plugin name="PaneLayout">
        <Template name="canvas">
          <TemplateConnector>
            {({ }, { changeBBox }) => (
              <Sizer>
                {({ width, height }) => {
                  return (
                    <Pane changeBBox={changeBBox} width={width} height={height} />
                  );
                }
                }
              </Sizer>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
