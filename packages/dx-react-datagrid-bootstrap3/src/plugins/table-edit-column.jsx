import React from 'react';
import { TableEditColumn as TableEditColumnBase } from '@devexpress/dx-react-datagrid';
import {
  EditCommandHeadingCell,
  EditCommandCell,
  CommandButton,
} from '../templates/table-edit-command-cell';

export const TableEditColumn = ({
    cellTemplate,
    headingCellTemplate,
    commandTemplate,
    allowCreating,
    allowEditing,
    allowDeleting,
  }) => (
    <TableEditColumnBase
      cellTemplate={cellTemplate || EditCommandCell}
      headingCellTemplate={headingCellTemplate || EditCommandHeadingCell}
      commandTemplate={commandTemplate || CommandButton}
      allowCreating={allowCreating}
      allowEditing={allowEditing}
      allowDeleting={allowDeleting}
    />
);
TableEditColumn.propTypes = {
  cellTemplate: React.PropTypes.func,
  headingCellTemplate: React.PropTypes.func,
  commandTemplate: React.PropTypes.func,
  allowCreating: React.PropTypes.bool,
  allowEditing: React.PropTypes.bool,
  allowDeleting: React.PropTypes.bool,
};
TableEditColumn.defaultProps = {
  cellTemplate: undefined,
  headingCellTemplate: undefined,
  commandTemplate: undefined,
  allowCreating: false,
  allowEditing: false,
  allowDeleting: false,
};
