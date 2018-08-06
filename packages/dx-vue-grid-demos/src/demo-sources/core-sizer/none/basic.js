import { DxSizer } from '@devexpress/dx-vue-core';

export default {
  render() {
    return (
      <div
        style={{
          display: 'inline-block',
        }}
      >
        <DxSizer>
          {({ width, height }) => (
            <div
              style={{
                border: '1px solid black',
                width: '50vw',
                height: '50vh',
              }}
            >
              Width: {width}; Height: {height}
            </div>
          )}
        </DxSizer>
      </div>
    );
  },
};
