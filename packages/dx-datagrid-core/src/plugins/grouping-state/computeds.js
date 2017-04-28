const groupRows = (originalRows, groupedColumns, parentGroup) => {
  if (!groupedColumns.length) return originalRows;

  const groupColumn = groupedColumns[0];
  const nextGroupedColumns = groupedColumns.slice(1);
  const groups = [];
  const groupHash = {};

  originalRows.forEach((row) => {
    const groupKey = row[groupColumn.name].toString();
    let group;

    if (groupKey in groupHash) {
      group = groupHash[groupKey];
    } else {
      group = {
        _headerKey: `groupRow_${groupColumn.name}`,
        key: (parentGroup ? `${parentGroup.key}_` : '') + groupKey,
        colspan: (parentGroup ? parentGroup.colspan + 1 : 0),
        value: groupKey,
        type: 'groupRow',
        column: groupColumn,
        rows: [],
      };
      groupHash[groupKey] = group;
      groups.push(group);
    }

    group.rows.push(row);
  });

  if (nextGroupedColumns.length) {
    for (let i = 0; i < groups.length; i += 1) {
      const group = groups[i];
      group.rows = groupRows(group.rows, nextGroupedColumns, group);
    }
  }

  return groups;
};

export const groupedRows = (rows, grouping) => groupRows(rows, grouping);

const expandGroups = (rows, expandedGroups, result) => {
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    result.push(row);
    if (row.type === 'groupRow' && expandedGroups[row.key]) {
      expandGroups(row.rows, expandedGroups, result);
    }
  }
};

export const expandedGroupRows = (rows, expandedGroups) => {
  const result = [];
  expandGroups(rows, expandedGroups, result);
  return result;
};
