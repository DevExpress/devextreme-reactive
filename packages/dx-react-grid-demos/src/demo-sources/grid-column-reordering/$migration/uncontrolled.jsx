export default () => {
    return (
      <div>
        <DataGrid
          dataSource={rows}
          allowColumnReordering={true}
        >
          <Column
            dataField={'city'}
            caption={'City'}
          />
          <Column
            dataField={'gender'}
            caption={'Gender'}
            width={100}
          />
          <Column
            dataField={'car'}
            caption={'Car'}
          />
          <Column
            dataField={'name'}
            caption={'Name'}
          />
        </DataGrid>
      </div>
    );
};