const groupCellRender = ({ value }) => (
    <span>
      from
      {' '}
      {value.from}
      {' '}
      to
      {' '}
      {value.to}
    </apsn>
  );
  
  const nameGroupCriteria = rowData => {
    const firstLetter = String(rowData.name).substr(0, 1).toLowerCase();
    const groupValue = firstLetter < 'n'
      ? { from: 'A', to: 'M' }
      : { from: 'N', to: 'Z' };
    return {
      value: groupValue,
      key: `${groupValue.from}-${groupValue.to}`,
    };
  };
  
  export default () => {
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <Grouping contextMenuEnabled={true} />
          <GroupPanel visible={true} />
          <Column
            dataField={'name'}
            caption={'Name'}
            defaultGroupIndex={0}
            calculateGroupValue={nameGroupCriteria}
            showWhenGrouped={true}
            groupCellRender={groupCellRender}
          />
          <Column
            dataField={'gender'}
            caption={'Gender'}
          />
          <Column
            dataField={'city'}
            caption={'City'}
          />
          <Column
            dataField={'car'}
            caption={'Car'}
          />
        </DataGrid>
      </div>
    );
};
