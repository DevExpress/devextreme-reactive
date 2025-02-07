const toLowerCase = value => String(value).toLowerCase();

export default () => {
  const calculateFilterExpression = useCallback((filterValue) => {
      const selector = (data) => {
        return toLowerCase(data.city);
      };

      return [selector, "startswith", toLowerCase(filterValue)];
  }, []);

  return (
    <div>
      <DataGrid
        dataSource={rows}
      >
        <FilterRow
          visible={true}
          showOperationChooser={false}
        />
        <Column
          dataField={'name'}
          caption={'Name'}
        />
        <Column
          dataField={'gender'}
          caption={'Gender'}
        />
        <Column
          dataField={'city'}
          caption={'City'}
          defaultFilterValue={'Paris'}
          calculateFilterExpression={calculateFilterExpression}
        />
        <Column
          dataField={'car'}
          caption={'Car'}
        />
      </DataGrid>
    </div>
  );
};