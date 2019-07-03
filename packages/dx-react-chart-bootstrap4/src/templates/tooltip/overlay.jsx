import * as React from 'react';
import * as PropTypes from 'prop-types';
import { RIGHT, TOP } from '@devexpress/dx-chart-core';
import { Popover } from '../../../../dx-react-bootstrap4/components';

const popperModifiers = {
  flip: { enabled: false },
};

export class Overlay extends React.PureComponent {
  render() {
    const {
      children, target, rotated, ...restProps
    } = this.props;
    return (
      <Popover
        placement={rotated ? RIGHT : TOP}
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
  rotated: PropTypes.bool.isRequired,
};
