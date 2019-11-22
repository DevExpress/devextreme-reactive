// BLOCK:imports
// BLOCK:imports

// BLOCK:body
const IdScroller = ({
  id, setId, scrollToRow,
}) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    Id:
    <input
      id="id_scroll"
      type="text"
      value={id}
      onChange={e => setId(e.target.value)}
      className="form-control"
      style={{ width: '6.1em', marginRight: '0.5em', marginLeft: '0.5em' }}
    />
    <button type="button" onClick={() => scrollToRow(id)} className="btn btn-default">
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
