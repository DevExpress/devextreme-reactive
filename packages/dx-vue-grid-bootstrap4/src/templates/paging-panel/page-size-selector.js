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
    debugger
    const showAll = getMessage('showAll');

    return (
      <div class="d-inline-block">
        <select
          class="form-control d-sm-none"
          value={pageSize}
          onChange={e => onPageSizeChange(parseInt(e.target.value, 10))}
        >
          {pageSizes.map(val => (
            <option key={val} value={val}>
              {val || showAll}
            </option>
          ))}
        </select>

        <ul class="pagination d-none d-sm-flex m-0">
          {pageSizes.map(item => (
            <li
              class={{
                'page-item': true,
                active: item === pageSize,
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
