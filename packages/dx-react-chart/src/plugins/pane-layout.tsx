import * as React from 'react';
import {
  Plugin,
  Getter,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { ClipPath } from '../templates/clip-path';

// Original *Sizer* cannot be used because it ignores (as it should do) *forceUpdate* request.
// *UpdatableSizer* implements *componentDidUpdate* and forces internal *Sizer* size calculation.
// It allows to run chart size recalculation by calling *forceUpdate* on chart instance.
import { UpdatableSizer } from '../utils/updatable-sizer';

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
export class PaneLayout extends React.PureComponent<{}, { ready: boolean }> {
  ref = React.createRef<SVGSVGElement>();
  clipPathId = `clip_path_${getUniqueId()}`;
  size = { width: 0, height: 0 };

  constructor(props) {
    super(props);

    this.state = {
      ready: false,
    };
  }

  render() {
    const { ready } = this.state;
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
                <UpdatableSizer
                  containerComponent={SizerContainer}
                  onSizeChange={(size) => {
                    if (this.size.width === size.width && this.size.height === size.height) {
                      this.setState({ ready: true });
                    } else {
                      this.size = size;
                    }
                    changeBBox({ placeholder: 'pane', bBox: size });
                  }}
                >
                  <svg
                    ref={this.ref}
                    {...params}
                    width={width}
                    height={height}
                    style={SVG_STYLE}
                  >
                    <ClipPath id={this.clipPathId} width={width} height={height} />
                    {ready && <TemplatePlaceholder name="series" />}
                  </svg>
                </UpdatableSizer>
              );
            }}
          </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}
