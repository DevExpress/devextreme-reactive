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
  refObject,
  ...restProps
}) => {
  const handleClick = () => onToggle();

  return (
    <td
      colSpan={colSpan}
      className={classNames({
        'dx-g-bs4-group-cell': true,
        'text-nowrap': !(tableColumn && tableColumn.wordWrapEnabled),
      }, className)}
      ref={refObject}
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
  inlineSummaryComponent: PropTypes.func.isRequired,
  inlineSummaryItemComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  inlineSummaries: PropTypes.array,
  row: PropTypes.any,
  column: PropTypes.object,
  expanded: PropTypes.bool,
  className: PropTypes.string,
  colSpan: PropTypes.number,
  getMessage: PropTypes.func.isRequired,
  onToggle: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  side: PropTypes.string,
  position: PropTypes.string,
  refObject: PropTypes.object,
};

Cell.defaultProps = {
  row: {},
  column: {},
  expanded: false,
  inlineSummaries: [],
  className: undefined,
  colSpan: 1,
  onToggle: () => {},
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  side: 'left',
  position: '',
  refObject: undefined,
};
