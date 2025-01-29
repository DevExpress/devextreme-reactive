export default () => {
    const [groupIndexes, setGroupIndexes] = useState({
      '2': 0
    });
  
    const onGroupIndexChanged = useCallback((columnIndex) => (groupIndex) => {
      setGroupIndexes({
        ...groupIndexes,
        [columnIndex]: groupIndex,
      });
    }, [groupIndexes]);
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <GroupPanel visible={true} />
          <Grouping contextMenuEnabled={true} />
          {
            columns.map((column, idx) => (
              <Column
                key={column.name}
                dataField={column.name}
                caption={column.title}
                groupIndex={groupIndexes[idx]}
                onGroupIndexChanged={onGroupIndexChanged(idx)}
              >
              </Column>
            ));  
          }
        </DataGrid>
      </div>
    );
};