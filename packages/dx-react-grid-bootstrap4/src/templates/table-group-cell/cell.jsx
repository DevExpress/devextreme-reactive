import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const Cell = ({
  className, colSpan, row, column,
  expanded, onToggle,
  children, tableRow, tableColumn,
  iconComponent: Icon, contentComponent: Content,
  inlineSummaryComponent: InlineSummary,
  inlineSummaryItemComponent: InlineSummaryItem,
  inlineSummaries,
  getMessage,
  containerComponent: Container,
  side, position,
  ...restProps
}) => {
  const handleClick = () => onToggle();

  return (
    <td
      className={classNames({
        'dx-g-bs4-group-cell': true,
        'text-nowrap': !(tableColumn && tableColumn.wordWrapEnabled),
      }, className)}
      onClick={handleClick}
      {...restProps}
    >
      <Container side={side} position={position}>
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
        {
          inlineSummaries.length ? (
            <InlineSummary
              column={column}
              inlineSummaries={inlineSummaries}
              getMessage={getMessage}
              inlineSummaryItemComponent={InlineSummaryItem}
            />
          ) : null
        }
      </Container>
    </td>
  );
};

Cell.propTypes = {
  contentComponent: PropTypes.func.isRequired,
  iconComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  row: PropTypes.any,
  column: PropTypes.object,
  className: PropTypes.string,
  colSpan: PropTypes.number,
  onToggle: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  side: PropTypes.string,
  position: PropTypes.string,
};

Cell.defaultProps = {
  row: {},
  column: {},
  className: undefined,
  colSpan: 1,
  onToggle: () => {},
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  side: 'left',
  position: '',
};
