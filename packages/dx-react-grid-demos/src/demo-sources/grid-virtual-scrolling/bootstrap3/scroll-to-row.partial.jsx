// BLOCK:imports
// BLOCK:imports

// BLOCK:body
const IndexScroller = ({
  topIndex, setTopIndex, goToIndex,
}) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    Index:
    <input
      id="index_scroll"
      type="number"
      value={topIndex}
      onChange={e => setTopIndex(e.target.value)}
      className="form-control"
      style={{ width: '6.1em', marginRight: '0.5em', marginLeft: '0.5em' }}
    />
    <button type="button" onClick={goToIndex} className="btn btn-default">
      Go
    </button>
  </div>
);

const IdScroller = ({ topId, setTopId, goToId }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    Id:
    <input
      id="id_scroll"
      type="text"
      value={topId}
      onChange={e => setTopId(e.target.value)}
      className="form-control"
      style={{ width: '6.1em', marginRight: '0.5em', marginLeft: '0.5em' }}
    />
    <button type="button" onClick={goToId} className="btn btn-default">
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
