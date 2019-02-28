import * as React from 'react';
import {
  Plugin,
  Getter,
  Action,
  Template,
  TemplatePlaceholder,
  createStateHelper,
  ActionFn,
} from '@devexpress/dx-react-core';
import { bBoxes } from '@devexpress/dx-chart-core';
import { LayoutManagerProps, LayoutManagerState, BBoxesChange } from '../types';

export class LayoutManager extends React.Component<LayoutManagerProps, LayoutManagerState> {
  static defaultProps: Partial<LayoutManagerProps> = {
    width: 0,
  };
  changeBBox: ActionFn<BBoxesChange>;

  constructor(props: LayoutManagerProps) {
    super(props);
    const { width, height } = this.props;

    this.state = { bBoxes: { pane: { width: width!, height } } };

    const stateHelper = createStateHelper(this);
    this.changeBBox = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'bBoxes',
      bBoxes,
    );
  }

  render() {
    const {
      width, height, rootComponent: Root, ...restProps
    } = this.props;
    const { bBoxes: stateBBoxes } = this.state;

    return (
      <Plugin>
        <Getter name="layouts" value={stateBBoxes} />
        <Action name="changeBBox" action={this.changeBBox} />

        <Template name="root">
          <Root
            width={width!}
            height={height}
            {...restProps}
          >
            <TemplatePlaceholder name="canvas" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}
