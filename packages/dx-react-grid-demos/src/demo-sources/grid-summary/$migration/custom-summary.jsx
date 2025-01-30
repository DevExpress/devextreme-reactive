export default () => {
    const onSelectionChanged = useCallback(e => e.component.refresh(true), []);
    
    const calculateCustomSummary = useCallback(options => {
      if (options.summaryProcess === 'start') {
        options.totalValue = 0;
        return;
      }
  
      const isRowSelected = options.component.isRowSelected(options.value?.ID);
  
      if (options.summaryProcess !== 'calculate' || !isRowSelected) {
        return;
      }
      
      switch(options.name) {
        case 'SalesSumSummary':
          options.totalValue += options.value.SaleAmount;
          break;
        case 'SalesMaxSummary':
          options.totalValue = Math.max(options.totalValue, options.value.SaleAmount)
          break;
        case 'RegionCountSummary':
          options.totalValue++;
      }
    }, []);
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
          onSelectionChanged={onSelectionChanged}
        >
          <Column
            dataField={'region'}
            caption={'Region'}
          />
          <Column
            dataField={'sector'}
            caption={'Sector'}
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
            dataField={'amount'}
            caption={'Sale Amount'}
            alignment={'right'}
            format="currency"
          />
          <Summary calculateCustomSummary={calculateCustomSummary}>
            <TotalItem
              name="RegionCountSummary"
              summaryType="custom"
              displayFormat="Count: {0}"
              showInColumn="region" />
            <TotalItem
              name="SalesMaxSummary"
              summaryType="custom"
              displayFormat="Max: {0}"
              showInColumn="amount" />
            <TotalItem
              name="SalesSumSummary"
              summaryType="custom"
              displayFormat="Sum: {0}"
              showInColumn="amount" />
          </Summary>
        </DataGrid>
      </div>
    );
};