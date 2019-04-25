import * as React from 'react';
import { Plugin, Template, TemplateConnector } from '@devexpress/dx-react-core';
import { SpaceFillingRectsProps, BBoxes } from '../types';

export class SpaceFillingRects extends React.PureComponent<SpaceFillingRectsProps> {
  render() {
    const { placeholders } = this.props;
    return (
      <Plugin name="SpaceFillingRects">
        {placeholders.map(name => (
          <Template name={name} key={name}>
            <TemplateConnector>
              {({ layouts }) => {
                const key = name.slice(name.indexOf('-') + 1);
                const width = Object.keys(layouts as BBoxes).reduce((prev, cur) => {
                  if (cur.includes(key)) {
                    return prev + layouts[cur].width;
                  }
                  return prev;
                }, 0);
                return <div id={name} style={{ width }} />;
              }}
            </TemplateConnector>
          </Template>
        ))}
      </Plugin>
    );
  }
}
