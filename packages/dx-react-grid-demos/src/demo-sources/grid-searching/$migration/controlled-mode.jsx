export default () => {
    const [searchPanelText, setSearchPanelText] = useState('Female');
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <SearchPanel
            visible={true}
            text={searchPanelText}
            onTextChanged={setSearchPanelText}
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