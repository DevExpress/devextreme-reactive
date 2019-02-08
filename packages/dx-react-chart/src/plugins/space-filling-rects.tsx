import * as React from 'react';
import { Plugin, Template, TemplateConnector } from '@devexpress/dx-react-core';

type SpaceFillingRectsProps = {placeholders: string[]};

export class SpaceFillingRects extends React.PureComponent<SpaceFillingRectsProps> {
  render() {
    const { placeholders } = this.props;
    return (
      <Plugin name="SpaceFillingRects">
        {placeholders.map(name => (
          <Template name={name} key={name}>
            <TemplateConnector>
              {({ layouts: positions }) => {
                const [, horizontal, postfix] = name.split('-');
                // tslint:disable-next-line: max-line-length
                const { width }: {width: number} = positions[horizontal + (postfix ? `-${postfix}` : '')] || {};
                return <div id={name} style={{ width }} />;
              }}
            </TemplateConnector>
          </Template>
        ))}
      </Plugin>
    );
  }
}
