export const Editor = {
  name: 'Editor',
  inheritAttrs: false,
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    getMessage: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleChange(e) {
      this.$emit('changeValue', e.target.value);
    },
  },
  render() {
    const {
      value,
      disabled,
      getMessage,
    } = this;

    return (
      <input
        {...{ attrs: { ...this.$attrs }, on: { ...this.$listeners } }}
        type="text"
        class="form-control"
        value={value}
        onInput={this.handleChange}
        readOnly={disabled}
        placeholder={getMessage('filterPlaceholder')}
      />
    );
  },
};
