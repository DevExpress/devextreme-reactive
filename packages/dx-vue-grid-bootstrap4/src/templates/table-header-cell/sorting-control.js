import { SortingIndicator } from '../parts/sorting-indicator';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

export const SortingControl = {
  props: {
    align: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      default: null,
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
          'd-inline-flex flex-direction-row align-items-center mw-100': true,
          'dx-g-bs4-cursor-pointer': !this.disabled,
          'flex-row-reverse': this.align === 'right',
          'text-primary': this.direction,
        }}
        onClick={this.handleClick}
        onKeydown={this.handleKeyDown}
        tabIndex={this.disabled ? -1 : 0}
        onBlur={this.handleBlur}
        onMousedown={this.handleMouseDown}
      >
        <span
          class="dx-g-bs4-sorting-control-text"
        >
          {this.$slots.default}
        </span>
        {this.direction && (
          <SortingIndicator
            direction={this.direction}
          />
        )}
      </span>
    );
  },
};
