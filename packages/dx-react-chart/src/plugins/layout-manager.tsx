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

const defaultProps = { width: 0 };
type LayoutManagerDefaultProps = Readonly<typeof defaultProps>;
type LayoutManagerProps = {
  height: number,
  rootComponent: any,
} & Partial<LayoutManagerDefaultProps>;
type LayoutManagerState = {bBoxes: {pane: {width: number | undefined, height: number}}};

export class LayoutManager extends React.Component<LayoutManagerProps, LayoutManagerState> {
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
