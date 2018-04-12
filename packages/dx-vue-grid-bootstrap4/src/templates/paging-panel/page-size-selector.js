export const PageSizeSelector = {
  props: {
    pageSize: {
      type: Number,
      isRequired: true,
    },
    onPageSizeChange: {
      type: Function,
      isRequired: true,
    },
    pageSizes: {
      type: Array,
      isRequired: true,
    },
    getMessage: {
      type: Function,
      isRequired: true,
    },
  },
  render() {
    const {
      pageSize,
      onPageSizeChange,
      pageSizes,
      getMessage,
    } = this;
    const showAll = getMessage('showAll');

    return (
      <div className="d-inline-block">
        <select
          className="form-control d-sm-none"
          value={pageSize}
          onChange={e => onPageSizeChange(parseInt(e.target.value, 10))}
        >
          {pageSizes.map(val => (
            <option key={val} value={val}>
              {val || showAll}
            </option>
          ))}
        </select>
        {/* <Pagination className="d-none d-sm-flex m-0">
          {pageSizes.map(item => (
            <PaginationItem key={item} active={item === pageSize && true}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageSizeChange(item);
                }}
              >
                {item || showAll}
              </PaginationLink>
            </PaginationItem>
          ))}
        </Pagination> */}
        <ul class="pagination d-none d-sm-flex m-0">
          {pageSizes.map(item => (
            <li
              class={{
                'page-item': true,
                active: item === pageSize && true,
              }}
            >
              <a
                class="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageSizeChange(item);
                }}
              >
                {item || showAll}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  },
};
