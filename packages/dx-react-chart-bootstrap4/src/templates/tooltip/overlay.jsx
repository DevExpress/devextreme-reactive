import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Popover } from '../../../../dx-react-bootstrap4/components';

const popperModifiers = {
  flip: { enabled: false },
};

// Popover component calls *target* function from render.
// For the first time it returns null as expected and Popover crashes.
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
            modifiers={popperModifiers}
            {...restProps}
          >
            <div className="popover-body">
              {children}
            </div>
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
