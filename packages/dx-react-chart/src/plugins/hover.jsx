import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Getter,
} from '@devexpress/dx-react-core';
import {
  changeSeriesState, processPointerMove, getHoverTargets, HOVERED,
} from '@devexpress/dx-chart-core';

export class Hover extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hover: props.hover || props.defaultHover,
    };
    const handlePointerMove = this.handlePointerMove.bind(this);
    this.getPointerMoveHandlers = ({ pointerMoveHandlers }) => [
      ...pointerMoveHandlers, handlePointerMove,
    ];
  }

  static getDerivedStateFromProps(props, state) {
    return { hover: props.hover !== undefined ? props.hover : state.hover };
  }

  handlePointerMove({ targets }) {
    const { onHoverChange } = this.props;
    const { hover: currentTarget } = this.state;
    const hover = processPointerMove(targets, currentTarget, onHoverChange);
    if (hover !== undefined) {
      this.setState({ hover });
    }
  }

  render() {
    const { hover } = this.state;
    // Function has to be recreated every time as there is no other way
    // to notify that "series" is updated.
    const getSeries = ({ series }) => changeSeriesState(series, getHoverTargets(hover), HOVERED);
    return (
      <Plugin name="Hover">
        <Getter name="pointerMoveHandlers" computed={this.getPointerMoveHandlers} />
        <Getter name="series" computed={getSeries} />
      </Plugin>
    );
  }
}

Hover.propTypes = {
  defaultHover: PropTypes.shape({
    series: PropTypes.string.isRequired,
    point: PropTypes.number,
  }),
  hover: PropTypes.shape({
    series: PropTypes.string.isRequired,
    point: PropTypes.number,
  }),
  onHoverChange: PropTypes.func,
};

Hover.defaultProps = {
  defaultHover: undefined,
  hover: undefined,
  onHoverChange: undefined,
};
