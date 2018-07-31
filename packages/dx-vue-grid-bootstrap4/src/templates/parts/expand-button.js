const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const handleMouseDown = (e) => { e.target.style.outline = 'none'; };
const handleBlur = (e) => { e.target.style.outline = ''; };

export const ExpandButton = {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    expanded: {
      type: Boolean,
    },
  },
  render() {
    const { expanded, visible } = this;
    const fireToggle = () => {
      if (!visible) return;
      this.$emit('toggle', !expanded);
    };
    const handleClick = (e) => {
      e.stopPropagation();
      fireToggle();
    };
    const handleKeyDown = (e) => {
      if (e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE) {
        e.preventDefault();
        fireToggle();
      }
    };
    return (
      <i
        class={{
          'oi p-2 text-center dx-g-bs4-toggle-button': true,
          'oi-chevron-bottom': expanded,
          'oi-chevron-right': !expanded,
          'dx-g-bs4-toggle-button-hidden': !visible,
        }}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={visible ? 0 : undefined}
        onKeydown={handleKeyDown}
        onMousedown={handleMouseDown}
        onBlur={handleBlur}
        onClick={handleClick}
      />
    );
  },
};
