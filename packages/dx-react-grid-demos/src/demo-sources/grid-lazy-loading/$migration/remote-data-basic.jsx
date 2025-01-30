const VIRTUAL_PAGE_SIZE = 100;

export default () => {
  const [columns] = useState([
    { dataField: 'Id', caption: 'ID', width: 80 },
    { dataField: 'ProductCategoryName', caption: 'Category', width: 220 },
    { dataField: 'StoreName', caption: 'Store', width: 220 },
    { dataField: 'ProductName', caption: 'Product' },
    { dataField: 'SalesAmount', caption: 'Amount', width: 120 }
  ]);

  return (
    <div>
      <DataGrid
        dataSource={rows}
        columns={columns}
        height={440}
      >
        <Paging pageSize={VIRTUAL_PAGE_SIZE} />
        <Scrolling
          mode="virtual"
          preloadEnabled={true}
        />
      </DataGrid>
    </div>
  );
};