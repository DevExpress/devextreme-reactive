export default () => {
    const [pageSizes] = useState([5, 10, 15, 'all']);
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <Paging
            defaultPageIndex={0}
            defaultPageSize={5}
          />
          <Pager
            allowedPageSizes={pageSizes}
            visible={true}
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
          />
          <Column
            dataField={'car'}
            caption={'Car'}
          />
        </DataGrid>
      </div>
    );
};