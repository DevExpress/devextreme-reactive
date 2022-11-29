/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Scheduler, ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

const Demo: React.FunctionComponent = () => (
  <Paper>
    <Scheduler
      data={[]}
    >
      <ConfirmationDialog
        ignoreCancel
        messages={{
          discardButton: 'ddd',
        }}
      />
    </Scheduler>
  </Paper>
);

export default Demo;
