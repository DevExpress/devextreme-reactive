import * as React from 'react';
import {
  Plugin,
  Getter,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { PaneLayoutProps } from '../types';

// Original *Sizer* cannot be used because it ignores (as it should do) *forceUpdate* request.
// *UpdatableSizer* implements *componentDidUpdate* and forces internal *Sizer* size calculation.
// It allows to run chart size recalculation by calling *forceUpdate* on chart instance.
import { UpdatableSizer } from '../utils/updatable-sizer';

const DIV_STYLE: React.CSSProperties = {
  flex: 1, zIndex: 1, position: 'relative', width: '100%',
};

const getSvgStyle = (clipPath): React.CSSProperties => {
  return {
    position: 'absolute', left: 0, top: 0, overflow: 'visible', clipPath: `url(#${clipPath})`,
  };
};

const SizerContainer: React.SFC = ({ children }) => (
  <div style={DIV_STYLE}>{children}</div>
);

export class PaneLayout extends React.PureComponent<PaneLayoutProps> {
  ref = React.createRef<SVGSVGElement>();

  render() {
    const { id } = this.props;
    return (
      <Plugin name="PaneLayout">
        <Getter name="rootRef" value={this.ref} />
        <Template name="canvas">
          {params => (
            <TemplateConnector>
              {({ layouts }, { changeBBox }) => {
                const { width, height } = layouts.pane;
                return (
                  <UpdatableSizer
                    containerComponent={SizerContainer}
                    onSizeChange={size => changeBBox({ placeholder: 'pane', bBox: size })}
                  >
                    <svg
                      ref={this.ref}
                      {...params}
                      width={width}
                      height={height}
                      style={getSvgStyle(id)}
                    >
                      <TemplatePlaceholder name="series" />
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
