import { DxToolbar as DxToolbarBase } from '@devexpress/dx-vue-grid';
import { DxToolbar as Root } from '../templates/toolbar/toolbar';
import { FlexibleSpace } from '../templates/toolbar/flexible-space';

export const DxToolbar = {
  name: 'DxToolbar',
  render() {
    return (
      <DxToolbarBase
        rootComponent={Root}
        flexibleSpaceComponent={FlexibleSpace}
        {...this.props}
      />
    );
  },
  components: {
    DxRoot: Root,
  },
};
