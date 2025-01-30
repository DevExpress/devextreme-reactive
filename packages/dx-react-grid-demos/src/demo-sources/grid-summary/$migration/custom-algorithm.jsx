export default () => {
    const calculateCustomSummary = useCallback(options => {
      if(options.name == 'SalesMedianSummary') {
        switch(options.summaryProcess) {
          case 'start':
            options.totalValue = [];
            break;
          case 'calculate':
            options.totalValue.push(options.value);
            break;
          case 'finalize':
            if (!options.totalValue.length) {
              options.totalValue = 0;
              break;
            }
            const sortedValues = options.totalValue.sort((a, b) => a - b);
            if (options.totalValue.length % 2 === 1) {
              options.totalValue = sortedValues[(sortedValues.length + 1) / 2];
              break;
            }
            const halfIndex = sortedValues.length / 2;
            options.totalValue = (sortedValues[halfIndex] + sortedValues[halfIndex + 1]) / 2;
        }
      }
    }, []);
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
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
              name="SalesMedianSummary"
              column="amount"
              summaryType="custom"
              displayFormat="Median: {0}"
            />
            <TotalItem
              summaryType="avg"
              displayFormat="Avg: {0}"
              column="amount"
            />
          </Summary>
        </DataGrid>
      </div>
    );
};