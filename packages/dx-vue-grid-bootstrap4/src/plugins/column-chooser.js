import { DxColumnChooser as DxColumnChooserBase } from '@devexpress/dx-vue-grid';
import { Overlay } from '../templates/column-chooser/overlay';
import { Container } from '../templates/column-chooser/container';
import { Item } from '../templates/column-chooser/item';
import { ToggleButton } from '../templates/column-chooser/toggle-button';

export const DxColumnChooser = {
  name: 'DxColumnChooser',
  functional: true,
  render(h, context) {
    return (
      <DxColumnChooserBase
        overlayComponent={Overlay}
        containerComponent={Container}
        itemComponent={Item}
        toggleButtonComponent={ToggleButton}
        {...context.data}
      />
    );
  },
  components: {
    DxContainer: Container,
    DxItem: Item,
    DxOverlay: Overlay,
    DxToggleButton: ToggleButton,
  },
};
