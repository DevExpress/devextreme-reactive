import * as React from 'react';
import {
  Plugin,
  TemplateConnector,
  Template,
} from '@devexpress/dx-react-core';
import { Pane } from './pane';

export class PaneLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onContainerRef = this.onContainerRef.bind(this);
  }
  onContainerRef(node) {
    this.node = node;
  }
  calculateLayout(width, height) {
    const calculatedWidth = width;
    const calculatedHeight = height;
    const {
      width: containerWidth,
      height: containerHeight,
    } = (this.node && this.node.getBoundingClientRect()) || {};
    return {
      width: containerWidth || calculatedWidth,
      height: containerHeight || calculatedHeight,
    };
  }
  render() {
    return (
      <Plugin name="PaneLayout">
        <Template name="canvas">
          <TemplateConnector>
            {({ layouts }, { changeBBox }) => (<Pane layouts={layouts} changeBBox={changeBBox} />)}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
