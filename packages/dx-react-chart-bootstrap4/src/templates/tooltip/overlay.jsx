import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Popover } from '../../../../dx-react-bootstrap4/components';

const popperModifiers = {
  flip: { enabled: false },
};

export class Overlay extends React.PureComponent {
  render() {
    const { children, target, ...restProps } = this.props;
    return (
      <Popover
        placement="top"
        isOpen
        target={target}
        modifiers={popperModifiers}
        {...restProps}
      >
        <div className="popover-body">
          {children}
        </div>
      </Popover>
    );
  }
}

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.any.isRequired,
};
