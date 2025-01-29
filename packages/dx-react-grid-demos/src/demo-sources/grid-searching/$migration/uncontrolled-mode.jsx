export default () => {
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <SearchPanel
            visible={true}
            defaultText={'Paris'}
          />
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