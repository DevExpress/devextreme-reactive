import { DxDataTypeProvider } from '@devexpress/dx-vue-grid';

const CurrencyEditor = {
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
      this.$emit('valueChange', parseInt(targetValue, 10));
    },
  },
  template: `
    <input
      type="number"
      class="form-control text-right"
      style="'width': '100%'"
      :value="value === undefined ? '' : value"
      min="0"
      placeholder="Filter..."
      @change="handleChange"
    />
  `,
};

const CurrencyFormatter = {
  props: {
    value: {
      type: Number,
    },
  },
  template: `
    <span>
      \${{value}}
    </span>
  `,
};

export const CurrencyTypeProvider = {
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
      :formatterComponent="$options.components.CurrencyFormatter"
      :editorComponent="$options.components.CurrencyEditor"
      :availableFilterOperations="availableFilterOperations"
      :for="$attrs.for"
    />
  `,
  components: {
    DxDataTypeProvider,
    CurrencyFormatter,
    CurrencyEditor,
  },
};
