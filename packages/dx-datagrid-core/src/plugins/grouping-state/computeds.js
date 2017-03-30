const groupRows = (originalRows, grouping, parentGroup) => {
  if (!grouping.length) return originalRows;

  const groupColumn = grouping[0].column;
  const nextGrouping = grouping.slice(1);
  const groups = [];
  const groupHash = {};

  originalRows.forEach((r) => {
    const groupKey = r[groupColumn].toString();
    let group;

    if (groupKey in groupHash) {
      group = groupHash[groupKey];
    } else {
      group = {
        key: (parentGroup ? `${parentGroup.key}_` : '') + groupKey,
        colspan: (parentGroup ? parentGroup.colspan + 1 : 0),
        value: groupKey,
        type: 'groupRow',
        column: groupColumn,
        rows: [],
      };
      groupHash[groupKey] = group;
      if (parentGroup) {
        group._parentRow = parentGroup;
      }
      groups.push(group);
    }

    group.rows.push(Object.assign({}, r, { _parentRow: group }));
  });

  if (nextGrouping.length) {
    for (let i = 0; i < groups.length; i += 1) {
      const group = groups[i];
      group.rows = groupRows(group.rows, nextGrouping, group);
    }
  }

  return groups;
};

export const groupedRows = (rows, grouping) => groupRows(rows, grouping);

const expandGroups = (rows, expandedGroups) => {
  const result = rows.slice().map((row) => {
    if (row.type === 'groupRow' && expandedGroups[row.key]) {
      return [
        row,
        ...expandGroups(row.rows, expandedGroups),
      ];
    }
    return [row];
  }).reduce((acc, val) => acc.concat(val), []);

  return result;
};

export const expandedGroupRows = (rows, expandedGroups) => expandGroups(rows, expandedGroups);

