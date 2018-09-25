import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createRenderComponent } from '@devexpress/dx-react-core';

export const makeVirtualTable = (Table, {
  VirtualLayout,
  FixedHeader,
  FixedFooter,
  defaultEstimatedRowHeight,
  defaultHeight,
}) => {
  class VirtualTable extends React.PureComponent {
    constructor(props) {
      super(props);

      const {
        height,
        estimatedRowHeight,
        headTableComponent,
        footerTableComponent,
      } = props;
      this.layoutRenderComponent = createRenderComponent(VirtualLayout, {
        height,
        estimatedRowHeight,
        headTableComponent,
        footerTableComponent,
      });
    }

    componentDidUpdate() {
      const {
        height,
        estimatedRowHeight,
        headTableComponent,
        footerTableComponent,
      } = this.props;
      this.layoutRenderComponent.update({
        height,
        estimatedRowHeight,
        headTableComponent,
        footerTableComponent,
      });
    }

    render() {
      const {
        height,
        estimatedRowHeight,
        headTableComponent,
        ...restProps
      } = this.props;

      return (
        <Table layoutComponent={this.layoutRenderComponent.component} {...restProps} />
      );
    }
  }

  VirtualTable.propTypes = {
    estimatedRowHeight: PropTypes.number,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
    headTableComponent: PropTypes.func,
    footerTableComponent: PropTypes.func,
  };

  VirtualTable.defaultProps = {
    estimatedRowHeight: defaultEstimatedRowHeight,
    height: defaultHeight,
    headTableComponent: FixedHeader,
    footerTableComponent: FixedFooter,
  };

  Object.values(Table.components).forEach((name) => {
    VirtualTable[name] = Table[name];
  });

  VirtualTable.FixedHeader = FixedHeader;
  VirtualTable.FixedFooter = FixedFooter;

  return VirtualTable;
};
