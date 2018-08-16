const styles = {
  root: {
    position: 'relative',
  },
  triggers: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    zIndex: -1,
    visibility: 'hidden',
    opacity: 0,
  },
  expand: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  contract: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  contractTrigger: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200%',
    height: '200%',
  },
};

export const DxSizer = {
  name: 'DxSizer',
  inheritAttrs: false,
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  mounted() {
    this.setupListeners();
  },
  methods: {
    setupListeners() {
      const size = { height: this.$refs.root.offsetHeight, width: this.$refs.root.offsetWidth };

      this.$refs.contract.scrollTop = size.height;
      this.$refs.contract.scrollLeft = size.width;

      this.$refs.expandTrigger.style.width = `${size.width + 1}px`;
      this.$refs.expandTrigger.style.height = `${size.height + 1}px`;
      this.$refs.expand.scrollTop = 1;
      this.$refs.expand.scrollLeft = 1;


      if (this.width === size.width && this.height === size.height) return;

      this.width = size.width;
      this.height = size.height;
    },
  },
  render() {
    const { width, height } = this;
    return (
      <div
        ref="root"
        style={styles.root}
      >
        {width && height && this.$scopedSlots.default({ width, height })}
        <div style={styles.triggers}>
          <div
            ref="expand"
            style={styles.expand}
            onScroll={this.setupListeners}
          >
            <div
              ref="expandTrigger"
            />
          </div>
          <div
            ref="contract"
            style={styles.contract}
            onScroll={this.setupListeners}
          >
            <div
              style={styles.contractTrigger}
            />
          </div>
        </div>
      </div>
    );
  },
};
