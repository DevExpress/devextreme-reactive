export default () => {
    const [expandedRowKeys, setExpandedRowKeys] = useState([0, 1]);
  
    return (
      <TreeList
        dataSource={data}
        rootValue={null}
        expandedRowKeys={expandedRowKeys}
        onExpandedRowKeysChanged={setExpandedRowKeys}
        showRowLines={true}
        showBorders={true}
        columnAutoWidth={true}
        keyExpr="id"
        parentIdExpr="parentId"
      >
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