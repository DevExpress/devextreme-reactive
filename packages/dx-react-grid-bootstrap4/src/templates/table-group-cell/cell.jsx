import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Cell = ({
  className, colSpan, row, column,
  expanded, onToggle,
  children, tableRow, tableColumn,
  iconComponent: Icon, contentComponent: Content,
  containerComponent: Container,
  left,
  ...restProps
}) => {
  const handleClick = () => onToggle();

  return (
    <td
      colSpan={colSpan}
      className={classNames('dx-g-bs4-cursor-pointer', className)}
      onClick={handleClick}
      {...restProps}
    >
      <Container style={{ left }}>
        <Icon
          expanded={expanded}
          onToggle={onToggle}
          className="mr-2"
        />
        <Content
          column={column}
          row={row}
        >
          {children}
        </Content>
      </Container>
    </td>
  );
};

Cell.propTypes = {
  contentComponent: PropTypes.func.isRequired,
  iconComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  className: PropTypes.string,
  colSpan: PropTypes.number,
  row: PropTypes.any,
  column: PropTypes.object,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  left: PropTypes.string,
};

Cell.defaultProps = {
  className: undefined,
  colSpan: 1,
  row: {},
  column: {},
  expanded: false,
  onToggle: () => {},
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  left: "",
};
