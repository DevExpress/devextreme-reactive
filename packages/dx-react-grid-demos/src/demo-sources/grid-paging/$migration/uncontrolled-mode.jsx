export default () => {
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <Paging
            defaultPageIndex={0}
            pageSize={5}
          />
          <Pager visible={true} />
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
          />
          <Column
            dataField={'car'}
            caption={'Car'}
          />
        </DataGrid>
      </div>
    );
};