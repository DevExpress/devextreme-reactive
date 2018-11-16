import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Popover, PopoverBody } from 'reactstrap';

// Popover component calls *target* function from render.
// For the first time it is returns null as expected and Popover crashes.
// Because of it the following HOC is used to unwrap DOM element from *target* function.
export class Overlay extends React.PureComponent {
  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    const { children, target, ...restProps } = this.props;
    const domElement = target();
    return (
      domElement
        ? (
          <Popover
            placement="top"
            isOpen
            target={domElement}
            {...restProps}
          >
            <PopoverBody>
              {children}
            </PopoverBody>
          </Popover>
        )
        : null
    );
  }
}

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.func.isRequired,
};
