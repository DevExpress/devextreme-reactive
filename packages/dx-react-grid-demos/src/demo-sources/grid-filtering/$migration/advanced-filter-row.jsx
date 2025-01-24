const CurrencyEditor = ({ data: { value, setValue } } ) => {
    const handleChange = (event) => {
      const { value: targetValue } = event.target;
      if (targetValue.trim() === '') {
        setValue();
        return;
      }
      setValue(parseInt(targetValue, 10));
    };
    return (
      <input
        className="form-control text-right"
        type="number"
        placeholder="Filter..."
        value={value === undefined ? '' : value}
        min={0}
        onChange={handleChange}
      />
    );
  };
  
  export default () => {
    const calculateFilterExpression = useCallback((filterValue, selectedFilterOperation) => {
        if (!!filterValue && selectedFilterOperation === 'month') {
          const selector = (data) => {
            return parseInt(data.saleDate.split('-')[1], 10);
          };
  
          return [selector, "=", parseInt(filterValue, 10)];
        }
  
        if(!this.defaultCalculateFilterExpression) 
            return [this.dataField, 'contains', filterValue];
  
        return this.defaultCalculateFilterExpression.apply(this, arguments);
    }, []);
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <FilterRow
            visible={true}
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
            dataField={'saleDate'}
            caption={'Sale Date'}
            filterOperations={['month', 'contains', 'startsWith', 'endsWith']}
            calculateFilterExpression={calculateFilterExpression}
          />
          <Column
            dataField={'amount'}
            caption={'Sale Amount'}
            filterOperations={['=', '<>', '>', '>=', '<', '<=']}
            editCellComponent={CurrencyEditor}
          />
        </DataGrid>
      </div>
    );
};