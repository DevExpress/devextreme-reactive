export default () => {
    const [focusedRowIndex, setFocusedRowIndex] = useState(-1);
    const [focusedColumnIndex, setFocusedColumnIndex] = useState(-1);
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
          focusedRowIndex={focusedRowIndex}
          onFocusedRowIndexChanged={setFocusedRowIndex}
          focusedColumnIndex={focusedColumnIndex}
          onFocusedColumnIndexChanged={setFocusedColumnIndex}
        >
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