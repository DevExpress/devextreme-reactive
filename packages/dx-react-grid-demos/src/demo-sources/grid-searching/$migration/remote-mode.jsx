function isNotEmpty(value: string | undefined | null) {
    return value !== undefined && value !== null && value !== '';
  }
  
  const store = new CustomStore({
    key: 'OrderNumber',
    async load(loadOptions) {
      const paramNames = [
        'skip', 'take', 'requireTotalCount', 'requireGroupCount',
        'sort', 'filter', 'totalSummary', 'group', 'groupSummary',
      ];
  
      const queryString = paramNames
        .filter((paramName) => isNotEmpty(loadOptions[paramName]))
        .map((paramName) => `${paramName}=${JSON.stringify(loadOptions[paramName])}`)
        .join('&');
  
      try {
        const response = await fetch(`https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders?${queryString}`);
  
        const result = await response.json();
  
        return {
          data: result.data,
          totalCount: result.totalCount,
          summary: result.summary,
          groupCount: result.groupCount,
        };
      } catch (err) {
        throw new Error('Data Loading Error');
      }
    },
  });
  
  const remoteOperations = { filtering: true  }
  
  const App = () => (
    <DataGrid
      dataSource={store}
      showBorders={true}
      remoteOperations={remoteOperations}
    >
      <Column
        dataField="OrderNumber"
        dataType="number"
      />
      <Column
        dataField="OrderDate"
        dataType="date"
      />
      <Column
        dataField="StoreCity"
        dataType="string"
      />
      <Column
        dataField="StoreState"
        dataType="string"
      />
      <Column
        dataField="Employee"
        dataType="string"
      />
      <Column
        dataField="SaleAmount"
        dataType="number"
        format="currency"
      />
      <SearchPanel visible />
    </DataGrid>
);
  
export default App;