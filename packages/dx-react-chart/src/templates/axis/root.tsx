import * as React from 'react';
import { Axis } from '../../types';

const getOffset = (position: number) => (position >= 0 ? 0 : -position);
const getSize = (position: number, delta: number) => (position >= 0 ? position + delta : -position);

export class Root extends React.PureComponent<Axis.RootProps, Axis.RootState> {
  ref = React.createRef<SVGGElement>();

  constructor(props: Axis.RootProps) {
    super(props);
    this.state = {
      x: 0, y: 0,
    };
    this.adjust = this.adjust.bind(this);
  }

  componentDidMount() {
    this.setState(this.adjust);
  }

  componentDidUpdate() {
    // *setState* is called unconditionally because PureComponent is expected to break the cycle.
    this.setState(this.adjust);
  }

  // Since calculated state does not depend on current state non-callback version of *setState*
  // might have been expected - it can't be done.
  // Parent component (Axis) accesses its DOM content in *onSizeChange* handler. When
  // this component is mounted parent is not yet - it crashes on DOM access.
  // *setState* callback is invoked later then *componentDidMount* - by that time parent component
  // is already mounted and can access its DOM.
  // Because of it callback version of *setState* has to be used here.
  // Can we rely on the fact that by the time of callback parent is mounted?
  // For now we stick with it, but need to find a more solid solution.
  adjust(_: Axis.RootState, { dx, dy, onSizeChange }: Axis.RootProps): Axis.RootState {
    const bbox = this.ref.current!.getBBox();
    const width = dx ? bbox.width : getSize(bbox.x, bbox.width);
    const height = dy ? bbox.height : getSize(bbox.y, bbox.height);
    const x = dx ? 0 : getOffset(bbox.x);
    const y = dy ? 0 : getOffset(bbox.y);
    onSizeChange({ width, height });
    return { x, y };
  }

  render() {
    const { children, onSizeChange, dx, dy, ...restProps } = this.props;
    const { x, y } = this.state;
    return (
      <g
        ref={this.ref}
        transform={`translate(${x} ${y})`}
        {...restProps}
      >
        {children}
      </g>
    );
  }
}
