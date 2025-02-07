const formatCurrency = (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const renderSaleAmount = (data) => (
  <b style={{ color: 'darkblue' }}>
    {formatCurrency(data.value)}
  </b>
);

const formatDate = (value) => value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');

export default () => {
  return (
    <div>
      <DataGrid
        dataSource={rows}
      >
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
          format={formatDate}
        />
        <Column
          dataField={'saleAmount'}
          caption={'Sale Amount'}
          cellRender={renderSaleAmount}
        />
      </DataGrid>
    </div>
  );
};