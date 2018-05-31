export const Popover = {
  name: 'Popover',
  props: {
    target: null,
    visible: {
      type: Boolean,
    },
    toggle: {
      type: Function,
    },
  },
  methods: {
    handleDocumentClick(e) {
      if (e.target !== this.$el && !this.$el.contains(e.target)) {
        this.toggle(e);
      }
    },
  },
  created() {
    document.addEventListener('click', this.handleDocumentClick);
  },
  destroyed() {
    document.removeEventListener('click', this.handleDocumentClick);
  },
  mounted() {
    const {
      bottom,
      left,
      width,
    } = this.target.getBoundingClientRect();

    const x = (left + (width / 2)) - (this.$el.offsetWidth / 2);
    this.$el.style.transform = `translate(${x}px, ${bottom}px)`;
  },
  render() {
    return (
      <div
        class={{
          'popover bs-popover-bottom': true,
          'd-none': !this.visible,
        }}
      >
        <div class="popover-inner">{this.$slots.default}</div>
        <div class="arrow" style="left: 50%; margin-left: -8px;" />
      </div>
    );
  },
};
