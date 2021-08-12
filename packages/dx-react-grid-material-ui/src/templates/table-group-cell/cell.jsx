import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cell: {
    cursor: 'pointer',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  cellNoWrap: {
    whiteSpace: 'nowrap',
  },
});

const CellBase = ({
  contentComponent: Content,
  iconComponent: Icon,
  containerComponent: Container,
  inlineSummaryComponent: InlineSummary,
  inlineSummaryItemComponent: InlineSummaryItem,
  inlineSummaries, getMessage,
  style, colSpan, row,
  column, expanded,
  onToggle,
  classes, children,
  className, tableRow,
  refObject,
  tableColumn, side, position,
  ...restProps
}) => {
  const handleClick = () => onToggle();

  return (
    <TableCell
      colSpan={colSpan}
      style={style}
      className={classNames({
        [classes.cell]: true,
        [classes.cellNoWrap]: !(tableColumn && tableColumn.wordWrapEnabled),
      }, className)}
      ref={refObject}
      onClick={handleClick}
      {...restProps}
    >
      <Container side={side} position={position}>
        <Icon
          expanded={expanded}
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
    </TableCell>
  );
};

CellBase.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  contentComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  iconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  containerComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  inlineSummaryComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  inlineSummaryItemComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  style: PropTypes.object,
  colSpan: PropTypes.number,
  row: PropTypes.any,
  column: PropTypes.object,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  inlineSummaries: PropTypes.array,
  side: PropTypes.string,
  position: PropTypes.string,
  refObject: PropTypes.object,
};

CellBase.defaultProps = {
  style: null,
  colSpan: 1,
  row: {},
  column: {},
  expanded: false,
  inlineSummaries: [],
  onToggle: () => {},
  children: undefined,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  side: 'left',
  position: '',
  refObject: undefined,
};

export const Cell = withStyles(styles, { name: 'TableGroupCell' })(CellBase);
