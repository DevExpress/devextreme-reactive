import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Getter,
} from '@devexpress/dx-react-core';
import {
  changeSeriesState, processPointerMove, HOVERED,
} from '@devexpress/dx-chart-core';

const dependencies = [{ name: 'EventTracker', optional: true }];

export class HoverState extends React.PureComponent {
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
    const getSeries = ({ series }) => changeSeriesState(series, targets, HOVERED);
    return (
      <Plugin name="HoverState" dependencies={dependencies}>
        <Getter name="pointerMoveHandlers" computed={this.getPointerMoveHandlers} />
        <Getter name="series" computed={getSeries} />
      </Plugin>
    );
  }
}

HoverState.propTypes = {
  defaultHover: PropTypes.shape({
    series: PropTypes.string.isRequired,
    point: PropTypes.number.isRequired,
  }),
  hover: PropTypes.shape({
    series: PropTypes.string.isRequired,
    point: PropTypes.number.isRequired,
  }),
  onHoverChange: PropTypes.func,
};

HoverState.defaultProps = {
  defaultHover: undefined,
  hover: undefined,
  onHoverChange: undefined,
};
