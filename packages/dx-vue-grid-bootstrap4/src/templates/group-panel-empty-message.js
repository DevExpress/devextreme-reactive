export const GroupPanelEmptyMessage = {
  props: {
    getMessage: {
      type: Function,
      required: true,
    },
  },
  render() {
    return (
      <div
        class="dx-g-bs4-group-panel-empty-message"
      >
        {
          this.getMessage('groupByColumn')
          || <span>
            Click the <span class="oi oi-list dx-g-bs4-grouping-control-icon" /> icon in the column header to group by that column
          </span>
        }
      </div>
    );
  },
};
