import * as React from 'react';
import { Sizer } from '@devexpress/dx-react-core';

// eslint-disable-next-line react/prefer-stateless-function
export default class Demo extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          display: 'inline-block',
        }}
      >
        <Sizer>
          {({ width, height }) => (
            <div
              style={{
                border: '1px solid black',
                width: '50vw',
                height: '50vh',
              }}
            >
              Width:
              {' '}
              {width}
                ; Height:
              {' '}
              {height}
            </div>
          )}
        </Sizer>
      </div>
    );
  }
}
