export default () => {
    const [columns] = useState([
      {
        dataField: "region",
        caption: "Region",
        cssClass: "word-wrap",
        width: 100,
      },
      { dataField: "sector", caption: "Sector" },
      { dataField: "customer", caption: "Customer" },
      { dataField: "product", caption: "Product" },
      { dataField: "amount", caption: "Sale Amount" },
    ]);
    const [rows] = useState(
      generateRows({ columnValues: globalSalesValues, length: 8 })
    );
  
    return (
      <div className="card">
        <DataGrid dataSource={rows} columns={columns}></DataGrid>
      </div>
    );
  };