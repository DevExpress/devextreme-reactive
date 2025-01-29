export default () => {
    const [editRowKey, setEditRowKey] = useState(null);
    const [editChanges, setEditChanges] = useState([]);
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <Editing
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
            changes={editChanges}
            onChangesChanged={setEditChanges}
            editRowKey={editRowKey}
            onEditRowKeyChanged={setEditRowKey}
            mode="row"
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