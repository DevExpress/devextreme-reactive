// BLOCK:imports
// BLOCK:imports

// BLOCK:body
const IndexScroller = ({
  topIndex, setTopIndex, goToIndex,
}) => (
  <div className="form-inline">
    Index:
    <input
      id="index_scroll"
      type="number"
      value={topIndex}
      onChange={e => setTopIndex(e.target.value)}
      className="form-control m-2"
      style={{ width: '6em' }}
    />
    <button type="button" onClick={goToIndex} className="btn">
      Go
    </button>
  </div>
);

const IdScroller = ({
  topId, setTopId, goToId,
}) => (
  <div className="form-inline">
    Id:
    <input
      id="id_scroll"
      type="text"
      value={topId}
      onChange={e => setTopId(e.target.value)}
      className="form-control m-2"
      style={{ width: '6em' }}
    />
    <button type="button" onClick={goToId} className="btn">
      Go
    </button>
  </div>
);

const ScrollPanel = props => (
  <Plugin name="EditPropsPanel">
    <Template name="toolbarContent">
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <IndexScroller {...props} />
        <IdScroller {...props} />
      </div>
      <TemplatePlaceholder />
    </Template>
  </Plugin>
);
// BLOCK:body
