// BLOCK:body
// #FOLD_BLOCK
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
        <option value="doubleClick">Double Click</option>
      </select>
    </div>
  );
};

// #FOLD_BLOCK
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

const EditPropsPanel = props => (
  <Plugin name="EditPropsPanel">
    <Template name="toolbarContent">
      <SelectTextChecker {...props} />
      <TemplatePlaceholder />
      <StartEditActionSelector {...props} />
    </Template>
  </Plugin>
);
// BLOCK:body
