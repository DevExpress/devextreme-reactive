import { POSITION_CONTEXT } from './constants';

const PluginIndexerContext = {
  name: 'PluginIndexerContext',
  props: {
    position: {
      type: Function,
      required: true,
    },
  },
  provide() {
    return {
      [POSITION_CONTEXT]: this.position,
    };
  },
  render() {
    return this.$slots.default && this.$slots.default[0];
  },
};

export const PluginIndexer = {
  name: 'PluginIndexer',
  inject: {
    position: {
      from: POSITION_CONTEXT,
      default: undefined,
    },
  },
  render() {
    const { position } = this;

    return (
      <div>
        {
          this.$slots.default.map((child, index) => {
            if (!child.componentOptions) return child;

            const childPosition = () => {
              const calculatedPosition = (position && position()) || [];
              return [...calculatedPosition, index];
            };

            return (
              <PluginIndexerContext position={childPosition}>
                {child}
              </PluginIndexerContext>
            );
          })
        }
      </div>
    );
  },
};
