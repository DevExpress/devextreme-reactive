const StartEditActionSelector = (props) => {
    const { defaultAction, changeAction } = props;
    return (
      <div>
        {'Start Edit Action:'}
        &nbsp;
        <select
          defaultValue={defaultAction}
          onChange={e => changeAction(e.target.value)}
          className="dropdown"
        >
          <option value="click">Click</option>
          <option value="dblClick">Double Click</option>
        </select>
      </div>
    );
  };
  
  const SelectTextChecker = (props) => {
    const { isSelectText, changeSelectText } = props;
    return (
      <div
        style={{
          padding: '0em 1em',
        }}
      >
        <label htmlFor="selectTextChecker" className="form-check-label">
          <input
            type="checkbox"
            checked={isSelectText}
            id="selectTextChecker"
            name="selectTextChecker"
            className="form-check-input"
            onChange={e => changeSelectText(e.target.checked)}
          />
          Select Text On Focus
        </label>
      </div>
    );
  };
  
  export default () => {
    const [selectTextOnEditStart, setSelectTextOnEditStart] = useState(true);
    const [startEditAction, setStartEditAction] = useState('click');
  
    return (
      <div>
        <SelectTextChecker
          isSelectText={selectTextOnEditStart}
          changeSelectText={setSelectTextOnEditStart}
        />
        <StartEditActionSelector
          defaultAction={startEditAction}
          changeAction={setStartEditAction}
        />
        <DataGrid
          dataSource={rows}
        >
          <Editing
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
            startEditAction={startEditAction}
            selectTextOnEditStart={selectTextOnEditStart}
            mode="cell"
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