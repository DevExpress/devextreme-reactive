import { DxDataTypeProvider } from '@devexpress/dx-vue-grid';

const PercentEditor = {
  props: {
    value: {
      type: Number,
    },
  },
  methods: {
    handleChange(event) {
      const { value: targetValue } = event.target;
      if (targetValue.trim() === '') {
        this.$emit('valueChange', undefined);
        return;
      }
      this.$emit('valueChange', Math.min(Math.max(parseFloat(targetValue / 100), 0), 1));
    },
  },
  template: `
    <input
      type="number"
      class="form-control text-right"
      style="'width': '100%'"
      :value="value === undefined ? '' : (value * 100).toFixed(1)"
      step="0.1"
      min="0"
      max="100"
      placeholder="Filter..."
      @change="handleChange"
    />
  `,
};

export const PercentTypeProvider = {
  data() {
    return ({
      availableFilterOperations: [
        'equal', 'notEqual',
        'greaterThan', 'greaterThanOrEqual',
        'lessThan', 'lessThanOrEqual',
      ],
    });
  },
  template: `
    <dx-data-type-provider
      :editorComponent="$options.components.PercentEditor"
      :availableFilterOperations="availableFilterOperations"
      :for="$attrs.for"
    />
  `,
  components: {
    DxDataTypeProvider,
    PercentEditor,
  },
};
