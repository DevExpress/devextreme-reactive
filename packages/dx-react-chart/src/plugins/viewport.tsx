import * as React from 'react';
import {
  Plugin,
  Getter,
  Action,
  Getters,
  ActionFn,
} from '@devexpress/dx-react-core';
import { adjustLayout, ViewportOptions } from '@devexpress/dx-chart-core';
import { ViewportProps, ViewportState } from '../types';

class ViewportBase extends React.PureComponent<ViewportProps, ViewportState> {
  changeViewport: ActionFn<ViewportOptions> = (viewport) => {
    this.setState((state, { onViewportChange }) => {
      // There should be some check that viewport is actually changed.
      // But *viewport* is built outside and most like will always be new instance.
      // So it should be fieldwise equality check.
      // For now action is expected to be called only when *viewport* is really changed.
      if (onViewportChange) {
        onViewportChange(viewport as ViewportOptions);
      }
      return { viewport: viewport as ViewportOptions };
    });
  }

  constructor(props: ViewportProps) {
    super(props);
    this.state = {
      viewport: props.viewport || props.defaultViewport,
    };
  }

  static getDerivedStateFromProps(props: ViewportProps, state: ViewportState): ViewportState {
    return { viewport: props.viewport !== undefined ? props.viewport : state.viewport };
  }

  render() {
    const { viewport } = this.state;
    const doAdjustLayout = ({
      domains,
      ranges,
    }: Getters) => adjustLayout(domains, ranges, viewport!);
    return (
      <Plugin name="viewport">
        <Getter name="ranges" computed={doAdjustLayout} />
        <Action name="changeViewport" action={this.changeViewport} />
      </Plugin>
    );
  }
}

export const Viewport: React.ComponentType<ViewportProps> = ViewportBase;
