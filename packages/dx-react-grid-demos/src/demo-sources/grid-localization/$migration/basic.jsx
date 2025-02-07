import deMessages from "devextreme/localization/messages/de.json";
import { locale, loadMessages } from "devextreme/localization";

loadMessages(deMessages);
locale(navigator.language);

export default () => (
  <DataGrid
    dataSource={rows}
  >
    {/* ... */}
  </DataGrid>
);