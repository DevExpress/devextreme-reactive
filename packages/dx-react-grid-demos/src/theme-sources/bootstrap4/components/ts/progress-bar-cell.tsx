import { Table } from '@devexpress/dx-react-grid';
import * as React from 'react';

export const ProgressBarCell : React.ComponentType<Table.DataCellProps> =
  ({ value } : Table.DataCellProps) => {
    const percent : number = value * 100;
    return (
      <td style={{ position: 'relative', verticalAlign: 'inherit' }}>
        <div
          className="progress"
          style={{
            backgroundColor: 'transparent',
            borderRadius: 0,
            boxShadow: 'none',
            margin: 0,
          }}
        >
          <div
            aria-valuenow={parseInt(percent.toFixed(), 10)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percent}%` }}
            title={`${percent.toFixed(1)}%`}
          />
        </div>
      </td>
    );
};
