export default () => {
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <Editing
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
            mode="row"
          />
          <Column
            dataField={'firstName'}
            caption={'First Name'}
          >
            <RequiredRule />
          </Column>
          <Column
            dataField={'lastName'}
            caption={'Last Name'}
          >
            <RequiredRule />
          </Column>
          <Column
            dataField={'phone'}
            caption={'Phone'}
          />
          <Column
            dataField={'state'}
            caption={'State'}
          />
        </DataGrid>
      </div>
    );
};