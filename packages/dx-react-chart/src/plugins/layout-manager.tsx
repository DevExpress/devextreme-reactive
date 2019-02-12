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
import { bBoxes, BBoxesChange } from '@devexpress/dx-chart-core';
import { LayoutManagerProps, LayoutManagerState } from '../types';

const defaultProps = { width: 0 };
type LayoutManagerDefaultProps = Readonly<typeof defaultProps>;

export class LayoutManager extends React.Component<
  LayoutManagerProps & LayoutManagerDefaultProps, LayoutManagerState
> {
  static defaultProps = defaultProps;
  changeBBox: ActionFn<BBoxesChange>;

  constructor(props) {
    super(props);
    const { width, height } = this.props;

    this.state = { bBoxes: { pane: { width, height } } };

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
            height={height}
            width={width}
            {...restProps}
          >
            <TemplatePlaceholder name="canvas" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}
