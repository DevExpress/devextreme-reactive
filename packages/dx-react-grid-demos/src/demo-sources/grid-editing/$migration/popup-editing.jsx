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
            mode="popup"
          />
          <Popup title="Employee Details" showTitle={true} width={700} height={525} />
          <Form>
            <GroupItem caption="Personal Data">
                <SimpleItem dataField="firstName" />
                <SimpleItem dataField="lastName" />
                <SimpleItem dataField="title" />
                <SimpleItem dataField="birthDate" editorType="dxDateBox" />
            </GroupItem>
            <GroupItem caption="Business Info">
                <SimpleItem dataField="position" />
                <SimpleItem dataField="phone" editorType="dxTextBox" editorOptions={{ mode: 'tel' }} />
            </GroupItem>
          </Form>
          <Column
            dataField={'firstName'}
            caption={'First Name'}
          />
          <Column
            dataField={'lastName'}
            caption={'Last Name'}
          />
          <Column
            dataField={'title'}
            caption={'Title'}
            visible={false}
          />
          <Column
            dataField={'birthDate'}
            caption={'Birth Date'}
            visible={false}
            dataType="date"
          />
          <Column
            dataField={'position'}
            caption={'Position'}
          />
          <Column
            dataField={'phone'}
            caption={'Phone'}
          />
        </DataGrid>
      </div>
    );
};