export default () => {
    const priorityWeights = useMemo(() => ({
      Low: 0,
      Normal: 1,
      High: 2,
    }), []);  
    
    const comparePriority = useCallback((a, b) => {
      const priorityA = priorityWeights[a];
      const priorityB = priorityWeights[b];
      if (priorityA === priorityB) {
        return 0;
      }
      return (priorityA < priorityB) ? -1 : 1;
    }, [priorityWeights]);
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <Column
            dataField={'subject'}
            caption={'Subject'}
            width={300}
          />
          <Column
            dataField={'startDate'}
            caption={'Start Date'}
          />
          <Column
            dataField={'dueDate'}
            caption={'Due Date'}
          />
          <Column
            dataField={'priority'}
            caption={'Priority'}
            sortingMethod={comparePriority}
          />
        </DataGrid>
      </div>
    );
};