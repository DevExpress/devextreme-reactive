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
                const [, horizontal, postfix] = name.split('-');
                const key = horizontal + (postfix ? `-${postfix}` : '');
                const { width } = (layouts as BBoxes)[key] || { width: undefined };
                return <div id={name} style={{ width }} />;
              }}
            </TemplateConnector>
          </Template>
        ))}
      </Plugin>
    );
  }
}
