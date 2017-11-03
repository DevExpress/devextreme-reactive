import React from 'react';
import PropTypes from 'prop-types';
import {
  TableLayout,
  VirtualTableLayout,
} from '@devexpress/dx-react-grid';

const MINIMAL_COLUMN_WIDTH = 120;
const ESTIMATED_ROW_HEIGHT = 37;
const HEIGHT = 530;

let stickyProp;
const testCSSProp = (property, value, noPrefixes) => {
  const prop = `${property}:`;
  // eslint-disable-next-line no-undef
  const el = document.createElement('test');
  const mStyle = el.style;

  if (!noPrefixes) {
    mStyle.cssText = `${prop + ['-webkit-', '-moz-', '-ms-', '-o-', ''].join(`${value};${prop}`) + value};`;
  } else {
    mStyle.cssText = prop + value;
  }
  return mStyle[property];
};

/* eslint-disable react/prop-types */
const containerTemplate = ({ children, ...restProps }) => (
  <div
    className="table-responsive"
    {...restProps}
    style={{
      ...restProps.style,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
    }}
  >
    {children}
  </div>
);
class TableHeader extends React.Component {
  componentDidMount() {
    stickyProp = testCSSProp('position', 'sticky');
  }
  render() {
    const { children, ...restProps } = this.props;
    return (
      <table
        className="table"
        {...restProps}
        style={{
          ...restProps.style,
          tableLayout: 'fixed',
          position: stickyProp,
          top: 0,
          zIndex: 1,
          background: 'white',
          overflow: 'visible',
        }}
      >
        {children}
      </table>
    );
  }
}
const tableHeaderTemplate = props => (
  <TableHeader {...props} />
);
const tableTemplate = ({ children, ...restProps }) => (
  <table
    className="table"
    {...restProps}
    style={{
      ...restProps.style,
      overflow: 'hidden',
      tableLayout: 'fixed',
    }}
  >
    {children}
  </table>
);
const headTemplate = ({ children, ...restProps }) => (
  <thead {...restProps}>{children}</thead>
);
const bodyTemplate = ({ children, ...restProps }) => (
  <tbody {...restProps}>{children}</tbody>
);

export const VirtualTable = ({
  headerRows,
  bodyRows,
  columns,
  cellTemplate,
  rowTemplate,
}) => (
  <TableLayout
    layoutComponent={VirtualTableLayout}
    headerRows={headerRows}
    rows={bodyRows}
    columns={columns}
    cellTemplate={cellTemplate}
    rowTemplate={rowTemplate}
    bodyTemplate={bodyTemplate}
    headTemplate={headTemplate}
    tableTemplate={tableTemplate}
    tableHeaderTemplate={tableHeaderTemplate}
    containerTemplate={containerTemplate}
    estimatedRowHeight={ESTIMATED_ROW_HEIGHT}
    minColumnWidth={MINIMAL_COLUMN_WIDTH}
    height={HEIGHT}
  />
);

VirtualTable.propTypes = {
  headerRows: PropTypes.array.isRequired,
  bodyRows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  rowTemplate: PropTypes.func.isRequired,
};
