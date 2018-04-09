import { SortingIndicator } from '../parts/sorting-indicator';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

export const SortingControl = {
  props: {
    direction: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
  },
  methods: {
    handleMouseDown(e) {
      e.currentTarget.style.outline = 'none';
    },
    handleBlur(e) {
      e.currentTarget.style.outline = '';
    },
    handleClick(e) {
      this.emitChange(e);
    },
    handleKeyDown(e) {
      const isActionKeyDown = e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE;
      if (!isActionKeyDown) return;

      this.emitChange(e);
    },
    emitChange(e) {
      if (this.disabled) return;

      const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
      const direction = cancelSortingRelatedKey
        ? null
        : undefined;

      e.preventDefault();
      this.$emit('change', {
        direction,
        keepOther: e.shiftKey || cancelSortingRelatedKey,
      });
    },
  },
  render() {
    return (
      <span
        class={{
          'text-primary': this.direction,
        }}
        style={{ cursor: 'pointer' }}
        onClick={this.handleClick}
        onKeydown={this.handleKeyDown}
        tabIndex={this.disabled ? -1 : 0}
        onBlur={this.handleBlur}
        onMousedown={this.handleMouseDown}
      >
        {this.$slots.default}
        &nbsp;
        <SortingIndicator
          direction={this.direction}
        />
      </span>
    );
  },
};
