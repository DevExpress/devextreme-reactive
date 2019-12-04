import * as React from 'react';
import {
  Plugin,
  Getter,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
  Sizer,
} from '@devexpress/dx-react-core';
import { ClipPath } from '../templates/clip-path';

const DIV_STYLE: React.CSSProperties = {
  flex: 1, zIndex: 1, position: 'relative', width: '100%',
};

const SVG_STYLE: React.CSSProperties = {
  position: 'absolute', left: 0, top: 0, overflow: 'visible',
};

const SizerContainer: React.SFC = ({ children }) => (
  <div style={DIV_STYLE}>{children}</div>
);

let numDefs = 0;
const getUniqueId = () => {
  numDefs += 1;
  return numDefs;
};
export class PaneLayout extends React.PureComponent {
  ref = React.createRef<SVGSVGElement>();
  clipPathId = `clip_path_${getUniqueId()}`;

  render() {
    return (
      <Plugin name="PaneLayout">
        <Getter name="rootRef" value={this.ref} />
        <Getter name="clipPathId" value={this.clipPathId} />
        <Template name="canvas">
        {params => (
          <TemplateConnector>
            {({ layouts }, { changeBBox }) => {
              const { width, height } = layouts.pane;
              return (
                <Sizer
                  containerComponent={SizerContainer}
                  onSizeChange={size => changeBBox({ placeholder: 'pane', bBox: size })}
                >
                  <svg
                    ref={this.ref}
                    {...params}
                    width={width}
                    height={height}
                    style={SVG_STYLE}
                  >
                    <ClipPath id={this.clipPathId} width={width} height={height} />
                    <TemplatePlaceholder name="series" />
                  </svg>
                </Sizer>
              );
            }}
          </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}
