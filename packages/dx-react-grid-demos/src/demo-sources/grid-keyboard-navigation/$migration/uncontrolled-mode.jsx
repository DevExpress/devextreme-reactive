export default () => {
    return (
      <div>
        <DataGrid
          dataSource={rows}
          allowColumnReordering={true}
          defaultFocusedRowIndex={1}
          defaultFocusedColumnIndex={1}
        >
          <Editing
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
            mode="row"
          />
          <ColumnChooser
            enabled={true}
            mode="select"
          />
          <SearchPanel
            visible={true}
          />
          <Paging
            defaultPageIndex={0}
            pageSize={5}
          />
          <Pager
            visible={true}
          />
          <FilterRow
            visible={true}
            showOperationChooser={false}
          />
          <Column
            dataField={'name'}
            caption={'Name'}
            defaultVisibleIndex={3}
          />
          <Column
            dataField={'gender'}
            caption={'Gender'}
            defaultVisibleIndex={1}
            defaultVisible={false}
          />
          <Column
            dataField={'city'}
            caption={'City'}
            defaultVisibleIndex={0}
          />
          <Column
            dataField={'car'}
            caption={'Car'}
            defaultVisibleIndex={2}
            defaultVisible={false}
          />
        </DataGrid>
      </div>
    );
};