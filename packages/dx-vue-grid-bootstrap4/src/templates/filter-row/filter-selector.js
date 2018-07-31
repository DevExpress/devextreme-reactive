import { Popover } from '../popover';

export const FilterSelector = {
  name: 'FilterSelector',
  props: {
    value: {
      type: String,
    },
    availableValues: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    getMessage: {
      type: Function,
      required: true,
    },
    iconComponent: {
      type: Object,
      required: true,
    },
  },
  data() {
    return ({
      opened: false,
    });
  },
  methods: {
    handleButtonClick(e) {
      e.stopPropagation();
      this.opened = !this.opened;
    },
    handleOverlayToggle() {
      if (this.opened) this.opened = false;
    },
    handleMenuItemClick(nextValue) {
      this.opened = false;
      this.$emit('changeValue', nextValue);
    },
  },
  render() {
    const {
      value, availableValues, disabled, getMessage, iconComponent: Icon, opened,
    } = this;
    return availableValues.length ? (
      <div class="input-group-prepend">
        <button
          class="btn btn-outline-secondary"
          disabled={disabled || availableValues.length === 1}
          onClick={this.handleButtonClick}
          ref="buttonRef"
        >
          <Icon type={value} />
        </button>
        {this.$refs.buttonRef ? (
          <Popover
            visible={opened}
            target={this.$refs.buttonRef}
            onToggle={this.handleOverlayToggle}
          >
            <div class="py-2">
              {availableValues.map(valueItem => (
                <button
                  key={valueItem}
                  class={{
                    'dropdown-item d-flex align-items-center': true,
                    'dx-g-bs4-cursor-pointer dx-g-bs4-filter-selector-item': true,
                    active: valueItem === value,
                  }}
                  onClick={() => this.handleMenuItemClick(valueItem)}
                >
                  <Icon type={valueItem} />
                  <span class="dx-g-bs4-filter-selector-item-text">
                    {getMessage(valueItem)}
                  </span>
                </button>
              ))}
            </div>
          </Popover>
        ) : null}
      </div>
    ) : null;
  },
};
