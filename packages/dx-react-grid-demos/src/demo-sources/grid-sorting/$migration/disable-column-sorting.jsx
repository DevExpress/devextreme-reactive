export default () => {
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <Column
            dataField={'name'}
            caption={'Name'}
          />
          <Column
            dataField={'gender'}
            caption={'Gender'}
            defaultSortOrder={'desc'}
            allowSorting={false}
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