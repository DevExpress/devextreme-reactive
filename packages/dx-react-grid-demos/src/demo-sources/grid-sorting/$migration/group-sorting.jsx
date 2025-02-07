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
            defaultSortOrder={'desc'}
          />
          <Column
            dataField={'gender'}
            caption={'Gender'}
          />
          <Column
            dataField={'city'}
            caption={'City'}
            defaultSortOrder={'asc'}
            defaultGroupIndex={0}
          />
          <Column
            dataField={'car'}
            caption={'Car'}
          />
        </DataGrid>
      </div>
    );
};