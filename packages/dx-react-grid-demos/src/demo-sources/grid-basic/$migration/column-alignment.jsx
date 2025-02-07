export default () => {
    const [columns] = useState([
      { dataField: "region", caption: "Region" },
      { dataField: "sector", caption: "Sector", alignment: "center" },
      { dataField: "customer", caption: "Customer", alignment: "center" },
      { dataField: "product", caption: "Product" },
      { dataField: "amount", caption: "Sale Amount", alignment: "right" },
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