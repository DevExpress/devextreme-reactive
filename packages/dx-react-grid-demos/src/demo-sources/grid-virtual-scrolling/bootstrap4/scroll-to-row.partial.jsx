// BLOCK:imports
// BLOCK:imports

// BLOCK:body
const IdScroller = ({
  id, setId, scrollToRow,
}) => (
  <div className="form-inline">
    Id:
    <input
      id="id_scroll"
      type="text"
      value={id}
      onChange={e => setId(e.target.value)}
      className="form-control m-2"
      style={{ width: '6em' }}
    />
    <button type="button" onClick={() => scrollToRow(id)} className="btn">
      Go
    </button>
  </div>
);

const ScrollPanel = props => (
  <Plugin name="EditPropsPanel">
    <Template name="toolbarContent">
      <IdScroller {...props} />
      <TemplatePlaceholder />
    </Template>
  </Plugin>
);
// BLOCK:body
