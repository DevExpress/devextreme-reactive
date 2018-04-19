export const SearchPanelInput = {
  name: 'SearchPanelInput',
  props: {
    onValueChange: {
      type: Function,
      required: true,
    },
    value: {
      type: [Number, String],
      default: null,
    },
    getMessage: {
      type: Function,
      required: true,
    },
  },
  render() {
    const { value, getMessage } = this;
    const { valueChange: onValueChange } = this.$listeners;
    return (
      <input
        type="text"
        class="form-control w-25"
        onChange={e => onValueChange(e.target.value)}
        value={value}
        placeholder={getMessage('searchPlaceholder')}
      />
    );
  },
};
