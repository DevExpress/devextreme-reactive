const booleanCellRender = ({ value }) => (
    <span className="badge badge-secondary">
      {value ? 'Yes' : 'No'}
    </span>
  );
  
  const booleanEditCellRender = ({ value, setValue }) => (
    <select
      className="form-control"
      value={value}
      onChange={e => setValue(e.target.value === 'true')}
    >
      <option value={false}>
        No
      </option>
      <option value={true}>
        Yes
      </option>
    </select>
  );
  
  export default () => {
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <Editing
            allowAdding={true}
            allowDeleting={true}
            allowUpdating={true}
            editRowKey={[0]}
          />
          <Column
            dataField={'customer'}
            caption={'Customer'}
          />
          <Column
            dataField={'product'}
            caption={'Product'}
          />
          <Column
            dataField={'units'}
            caption={'Units'}
          />
          <Column
            dataField={'shipped'}
            caption={'Shipped'}
            cellRender={booleanCellRender}
            editCellRender={booleanEditCellRender}
          />
        </DataGrid>
      </div>
    );
};