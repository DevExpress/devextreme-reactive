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
  data() {
    return {
      size: { width: 0, height: 0 },
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

      this.size = size;
    },
  },
  render() {
    const { size } = this;
    return (
      <div
        ref="root"
        style={styles.root}
      >
        {this.$scopedSlots.default(size)}
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
