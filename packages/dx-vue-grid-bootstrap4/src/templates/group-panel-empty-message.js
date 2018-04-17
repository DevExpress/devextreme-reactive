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
        {this.getMessage('groupByColumn')}
      </div>
    );
  },
};
