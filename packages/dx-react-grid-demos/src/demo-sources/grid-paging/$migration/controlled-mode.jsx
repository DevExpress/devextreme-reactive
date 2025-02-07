export default () => {
    const [pageSizes] = useState([5, 10, 15]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <Paging
            pageIndex={pageIndex}
            onPageIndexChanged={setPageIndex}
            pageSize={pageSize}
            onPageSizeChanged={setPageSize}
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