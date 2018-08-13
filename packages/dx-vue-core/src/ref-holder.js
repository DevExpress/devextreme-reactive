export const DxRefHolder = {
  name: 'DxRefHolder',
  inheritAttrs: false,
  render() {
    return this.$slots.default[0];
  },
};
