export default () => {
    const [defaultExpandedRowIds] = useState([0]);
    
    return (
      <TreeList
        dataSource={data}
        rootValue={null}
        defaultExpandedRowKeys={defaultExpandedRowIds}
        showRowLines={true}
        showBorders={true}
        columnAutoWidth={true}
        keyExpr="id"
        parentIdExpr="parentId"
      >
        <Selection
          recursive={false}
          allowSelectAll={false}
          mode="multiple"
        />
        <Column
          dataField={'name'}
          caption={'Name'}
          width={300}
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
      </TreeList>
    );
};