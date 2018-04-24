import { SortingIndicator } from './parts/sorting-indicator';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const isActionKey = keyCode => keyCode === ENTER_KEY_CODE || keyCode === SPACE_KEY_CODE;

export const GroupPanelItem = {
  props: {
    item: {
      type: Object,
      required: true,
    },
    showSortingControls: {
      type: Boolean,
    },
    sortingDirection: {
      type: String,
    },
    showGroupingControls: {
      type: Boolean,
    },
    groupingEnabled: {
      type: Boolean,
    },
    sortingEnabled: {
      type: Boolean,
    },
  },
  render() {
    const {
      showSortingControls,
      showGroupingControls,
      sortingEnabled,
      groupingEnabled,
      item: { column },
      sortingDirection,
    } = this;
    const handleSortingChange = (e) => {
      const isActionKeyDown = isActionKey(e.keyCode);
      const isMouseClick = e.keyCode === undefined;
      if ((!showSortingControls || !sortingEnabled) || !(isActionKeyDown || isMouseClick)) return;

      const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
      const direction = (isMouseClick || isActionKeyDown) && cancelSortingRelatedKey
        ? null
        : undefined;

      e.preventDefault();
      this.$emit('sort', {
        direction,
        keepOther: cancelSortingRelatedKey,
      });
    };
    const handleUngroup = (e) => {
      if (!groupingEnabled) return;
      const isActionKeyDown = isActionKey(e.keyCode);
      const isMouseClick = e.keyCode === undefined;

      if (!isActionKeyDown && !isMouseClick) return;
      this.$emit('group');
    };
    return (
      <div
        class={{
          'btn-group mb-1 mr-1': true,
        }}
      >
        <span
          class={{
            'btn btn-outline-secondary': true,
            disabled: !sortingEnabled && (showSortingControls || !groupingEnabled),
          }}
          onClick={handleSortingChange}
          onKeydown={handleSortingChange}
          {...sortingEnabled ? { tabIndex: 0 } : null}
        >
          {column.title || column.name}
          {showSortingControls && sortingDirection && (
            <span>
              &nbsp;
              <SortingIndicator
                direction={sortingDirection}
              />
            </span>
          )}
        </span>

        {showGroupingControls && (
          <span
            class={{
              'btn btn-outline-secondary': true,
              disabled: !groupingEnabled,
            }}
            onClick={handleUngroup}
          >
            &nbsp;
            <span
              class="oi oi-x dx-g-bs4-group-panel-item-icon"
            />
          </span>)}
      </div>
    );
  },
};
