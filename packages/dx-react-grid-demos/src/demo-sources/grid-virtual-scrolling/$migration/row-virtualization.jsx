export default () => {
    const [columns] = useState([
      { dataField: 'Id', caption: 'ID' },
      { dataField: 'name', caption: 'Name' },
      { dataField: 'gender', caption: 'Gender' },
      { dataField: 'city', caption: 'City' },
      { dataField: 'car', caption: 'Car' }
    ]);
    
    return (
      <div>
        <DataGrid
          dataSource={rows}
          columns={columns}
          height={440}
        >
          <Paging enabled={false} pageSize={100000} />
          <Scrolling rowRenderingMode="virtual" />
        </DataGrid>
      </div>
    );
};