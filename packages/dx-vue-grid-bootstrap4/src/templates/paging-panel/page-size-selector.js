export const PageSizeSelector = {
  props: {
    pageSize: {
      type: Number,
      required: true,
    },
    pageSizes: {
      type: Array,
      required: true,
    },
    getMessage: {
      type: Function,
      required: true,
    },
  },
  render() {
    const {
      pageSize,
      pageSizes,
      getMessage,
    } = this;
    const { pageSizeChange } = this.$listeners;
    const showAll = getMessage('showAll');

    return (
      <div class="d-inline-block">
        <select
          class="form-control d-sm-none"
          value={pageSize}
          onChange={(e) => {
            pageSizeChange(parseInt(e.target.value, 10));
          }}
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
                  pageSizeChange(item);
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
