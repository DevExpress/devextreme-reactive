export default () => {
    const calculateCustomSummary = useCallback(options => {
      if(options.name == 'OverpricedCountSummary') {
        switch(options.summaryProcess) {
          case 'start':
            options.totalValue = 0;
            break;
          case 'calculate':
            options.totalValue += options.value > 6000 ? 1 : 0;
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
            width={230}
            format="currency"
          />
          <Summary calculateCustomSummary={calculateCustomSummary}>
            <TotalItem
              name="OverpricedCountSummary"
              column="amount"
              summaryType="custom"
              valueFormat="fixedPoint"
              displayFormat="Price higher than $6000: {0}"
            />
          </Summary>
        </DataGrid>
      </div>
    );
};