import React from 'react';

export const GroupPanel = ({ grouping, groupByColumn, groupByColumnText }) => {
  const text = groupByColumnText || 'Click G in the header to group by column';
  return grouping.length
        ? <div>{grouping.map(({ column: columnName }) =>
          <button
            type="button"
            className="btn btn-default"
            key={columnName}
            onClick={() => groupByColumn({ columnName, groupIndex: -1 })}
            style={{
              marginRight: '5px',
            }}
          >
            {columnName}
          </button>)}</div>
        : <span>{text}</span>;
};

GroupPanel.propTypes = {
  grouping: React.PropTypes.array.isRequired,
  groupByColumn: React.PropTypes.func.isRequired,
  groupByColumnText: React.PropTypes.string,
};

GroupPanel.defaultProps = {
  groupByColumnText: undefined,
};
