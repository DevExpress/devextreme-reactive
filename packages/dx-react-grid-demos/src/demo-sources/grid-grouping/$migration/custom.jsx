const groupCellRender = ({ column, value }) => (
    <span>
      Group
      {' '}
      <i>
        {column.caption}
      </i>
      {' '}
      by first letter:
      {' '}
      <strong>
        {value}
      </strong>
    </span>
  );
  
  const cityGroupCriteria = rowData => rowData.city.substr(0, 1);
  
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
          />
          <Column
            dataField={'gender'}
            caption={'Gender'}
          />
          <Column
            dataField={'city'}
            caption={'City'}
            groupIndex={0}
            calculateGroupValue={cityGroupCriteria}
            showWhenGrouped={true}
            groupCellRender={groupCellRender}
          />
          <Column
            dataField={'car'}
            caption={'Car'}
          />
        </DataGrid>
      </div>
    );
};