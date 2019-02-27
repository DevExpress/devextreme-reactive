import * as React from 'react';
import {
  Plugin,
  Getter,
  Getters,
} from '@devexpress/dx-react-core';
import {
  changeSeriesState, processPointerMove, HOVERED, TargetData,
} from '@devexpress/dx-chart-core';
import { HoverStateProps, HoverStateState, GetPointerMoveHandlersFn } from '../types';

const dependencies = [{ name: 'EventTracker', optional: true }];

class HoverStateBase extends React.PureComponent<HoverStateProps, HoverStateState> {
  getPointerMoveHandlers: GetPointerMoveHandlersFn;

  constructor(props: HoverStateProps) {
    super(props);
    this.state = {
      hover: props.hover || props.defaultHover,
    };
    const handlePointerMove = this.handlePointerMove.bind(this);
    this.getPointerMoveHandlers = ({ pointerMoveHandlers = [] }) => [
      ...pointerMoveHandlers, handlePointerMove,
    ];
  }

  static getDerivedStateFromProps(props: HoverStateProps, state: HoverStateState): HoverStateState {
    return { hover: props.hover !== undefined ? props.hover : state.hover };
  }

  handlePointerMove({ targets }: TargetData) {
    this.setState(({ hover: currentTarget }, { onHoverChange }) => {
      const hover = processPointerMove(targets, currentTarget!, onHoverChange);
      return hover !== undefined ? { hover: hover! } : null;
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

export const HoverState: React.ComponentType<HoverStateProps> = HoverStateBase;
