import { DxDataTypeProvider } from '@devexpress/dx-vue-grid';

const BooleanFormatter = {
  props: ['value'],
  template: `
    <span class="badge badge-secondary">{{ value === true ? 'Yes' : 'No' }}</span>
  `,
};

const BooleanEditor = {
  props: ['value'],
  template: `
    <select
      class="form-control"
      :value="value"
      @change="e => this.$emit('valueChange', e.target.value === 'true')"
    >
      <option value="false">No</option>
      <option value="true">Yes</option>
    </select>
  `,
};

export const BooleanTypeProvider = {
  template: `
    <dx-data-type-provider
      :formatterComponent="$options.components.BooleanFormatter"
      :editorComponent="$options.components.BooleanEditor"
      :for="$attrs.for"
    />
  `,
  components: {
    DxDataTypeProvider,
    BooleanFormatter,
    BooleanEditor,
  },
};
