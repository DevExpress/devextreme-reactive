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
            allowGrouping={false}
          />
          <Column
            dataField={'gender'}
            caption={'Gender'}
          />
          <Column
            dataField={'city'}
            caption={'City'}
            allowGrouping={false}
            groupIndex={0}
          />
          <Column
            dataField={'car'}
            caption={'Car'}
          />
        </DataGrid>
      </div>
    );
};