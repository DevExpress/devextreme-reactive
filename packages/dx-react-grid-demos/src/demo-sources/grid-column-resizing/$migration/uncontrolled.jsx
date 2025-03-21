export default () => {
    return (
      <div>
        <DataGrid
          dataSource={rows}
          allowColumnResizing={true}
        >
          <Column
            dataField={'name'}
            caption={'Name'}
            defaultWidth={180}
          />
          <Column
            dataField={'gender'}
            caption={'Gender'}
            defaultWidth={180}
          />
          <Column
            dataField={'city'}
            caption={'City'}
            defaultWidth={180}
          />
          <Column
            dataField={'car'}
            caption={'Car'}
            defaultWidth={240}
          />
        </DataGrid>
      </div>
    );
};