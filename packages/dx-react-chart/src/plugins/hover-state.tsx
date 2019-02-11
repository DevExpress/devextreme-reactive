import * as React from 'react';
import {
  Plugin,
  Getter,
  Getters,
} from '@devexpress/dx-react-core';
import {
  changeSeriesState, processPointerMove, HOVERED, Target, NotifyPointerMoveFn, HandlerFnList,
} from '@devexpress/dx-chart-core';
import { PureComputed } from '@devexpress/dx-core';

const dependencies = [{ name: 'EventTracker', optional: true }];

type HoverStateProps = {
  defaultHover?: Target,
  hover?: Target,
  onHoverChange?: NotifyPointerMoveFn,
};
type HoverStateState = {
  hover: Target,
};
export class HoverState extends React.PureComponent<HoverStateProps, HoverStateState> {
  getPointerMoveHandlers: PureComputed<[Getters], HandlerFnList>;
  constructor(props) {
    super(props);
    this.state = {
      hover: props.hover || props.defaultHover,
    };
    const handlePointerMove = this.handlePointerMove.bind(this);
    this.getPointerMoveHandlers = ({ pointerMoveHandlers = [] }) => [
      ...pointerMoveHandlers, handlePointerMove,
    ];
  }

  static getDerivedStateFromProps(props, state) {
    return { hover: props.hover !== undefined ? props.hover : state.hover };
  }

  handlePointerMove({ targets }) {
    this.setState(({ hover: currentTarget }, { onHoverChange }) => {
      const hover = processPointerMove(targets, currentTarget, onHoverChange);
      return hover !== undefined ? { hover } : null;
    });
  }

  render() {
    const { hover } = this.state;
    // Function has to be recreated every time as there is no other way
    // to notify that "series" is updated.
    const targets = hover ? [hover] : [];
    const getSeries = ({ series }: Getters) => changeSeriesState(series, targets, HOVERED);
    return (
      <Plugin name="HoverState" dependencies={dependencies}>
        <Getter name="pointerMoveHandlers" computed={this.getPointerMoveHandlers} />
        <Getter name="series" computed={getSeries} />
      </Plugin>
    );
  }
}
