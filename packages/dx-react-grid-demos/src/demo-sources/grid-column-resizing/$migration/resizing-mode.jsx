const ModeSelector = (props) => {
    const { defaultValue, changeMode } = props;
    return (
      <div>
        {'Column Resizing Mode:'}
        &nbsp;
        <select
          defaultValue={defaultValue}
          onChange={e => changeMode(e.target.value)}
          className="dropdown"
          style={{
            height: '2em',
          }}
        >
          <option value="widget">Widget</option>
          <option value="nextColumn">NextColumn</option>
        </select>
      </div>
    );
  };
  
  const ResetWidthButton = (props) => {
    const { resetWidths } = props;
    return (
      <button
        type="button"
        onClick={resetWidths}
        className="btn btn-sm"
        style={{
          paddingLeft: '8px',
          paddingRight: '8px',
          height: '2em',
          width: 'auto',
          fontSize: '1em',
        }}
      >
        Reset widths to default
      </button>
    );
  };
  
  export default () => {
    const [defaultColumnWidths] = useState({
      '0': 180,
      '1': 180,
      '2': 180,
      '3': 240
    });
  
    const [columnWidths, setColumnWidths] = useState(defaultColumnWidths);
    const [resizingMode, setResizingMode] = useState('widget');
  
    const onWidthChanged = useCallback((columnIndex) => (width) => {
      setColumnWidths({
        ...columnWidths,
        [columnIndex]: width
      })
    }, [columnWidths]);
    
    const resetColumnWidths = useCallback(() => {
      setColumnWidths(defaultColumnWidths);
    }, [defaultColumnWidths]);
  
    return (
      <div>
        <ModeSelector
          defaultValue={resizingMode}
          changeMode={setResizingMode}
        />
        <ResetWidthButton resetWidths={resetColumnWidths} />
        <DataGrid
          dataSource={rows}
          allowColumnResizing={true}
          columnResizingMode={resizingMode}
        >
          {
            columns.map((column, idx) => (
              <Column
                key={column.name}
                dataField={column.name}
                caption={column.title}
                onWidthChanged={onWidthChanged(idx)}
                width={columnWidths[idx]}
              >
              </Column>
            ));  
          }
        </DataGrid>
      </div>
    );
};