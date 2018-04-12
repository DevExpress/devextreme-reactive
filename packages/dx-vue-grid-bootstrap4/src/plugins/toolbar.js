import { Toolbar as ToolbarBase } from '@devexpress/dx-vue-grid';
import { Toolbar as Root } from '../templates/toolbar/toolbar';
import { FlexibleSpace } from '../templates/toolbar/flexible-space';

export const Toolbar = {
  render() {
    return (
      <ToolbarBase
        rootComponent={Root}
        flexibleSpaceComponent={FlexibleSpace}
        {...this.props}
      />
    );
  },
};

Toolbar.Root = Root;
