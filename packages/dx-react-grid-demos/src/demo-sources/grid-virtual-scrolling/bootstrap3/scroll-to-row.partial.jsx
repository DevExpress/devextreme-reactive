// BLOCK:imports
// BLOCK:imports

// BLOCK:body
const IndexScroller = ({
  topIndex, setTopIndex, goToIndex,
}) => (
  <div className="form-inline">
    <label htmlFor="index_scroll">
      Index:
      <input
        id="index_scroll"
        type="number"
        value={topIndex}
        onChange={e => setTopIndex(e.target.value)}
        className="form-control"
        style={{ width: '6.1em', marginRight: '0.5em', marginLeft: '0.5em' }}
      />
    </label>
    <button type="button" onClick={goToIndex} className="btn btn-default">
      Go
    </button>
  </div>
);

const IdScroller = ({ topId, setTopId, goToId }) => (
  <div className="form-inline">
    <label htmlFor="id_scroll">
      Id:
      <input
        id="id_scroll"
        type="text"
        value={topId}
        onChange={e => setTopId(e.target.value)}
        className="form-control"
        style={{ width: '6.1em', marginRight: '0.5em', marginLeft: '0.5em' }}
      />
    </label>
    <button type="button" onClick={goToId} className="btn btn-default">
      Go
    </button>
  </div>
);

const ScrollPanel = props => (
  <Plugin name="EditPropsPanel">
    <Template name="toolbarContent">
      <IndexScroller {...props} />
      <TemplatePlaceholder />
      <IdScroller {...props} />
    </Template>
  </Plugin>
);
// BLOCK:body
