import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Getter,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

// Original *Sizer* cannot be used because it ignores (as it should do) *forceUpdate* request.
// *UpdatableSizer* implements *componentDidUpdate* and forces internal *Sizer* size calculation.
// It allows to run chart size recalculation by calling *forceUpdate* on chart instance.
import { UpdatableSizer } from '../utils/updatable-sizer';

const DIV_STYLE = {
  flex: 1, zIndex: 1, position: 'relative', width: '100%',
};

const SVG_STYLE = {
  position: 'absolute', left: 0, top: 0, overflow: 'visible',
};

const SizerContainer = ({ children }) => (
  <div style={DIV_STYLE as any}>{children}</div>
);

SizerContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export class PaneLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
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
                      style={SVG_STYLE as any}
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
