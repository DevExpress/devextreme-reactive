import React from 'react';
import CodeSandboxer from 'react-codesandboxer';

export default () => (
  <CodeSandboxer
    examplePath="packages/dx-react-grid-demos/src/demo-sources/grid-basic/basic.jsxt"
    gitInfo={{
      account: 'ushkal',
      repository: 'devextreme-reactive',
      branch: 'master',
      host: 'github',
    }}
    afterDeploy={console.log}
    importReplacements={[
      ['@devexpress/dx-react-grid-<%&themeName%>', '@devexpress/dx-react-grid-bootstrap4'],
      ['packages/dx-react-grid-demos/demo-data/generator', 'packages/dx-react-grid-demos/src/demo-data/generator'],
      // ['demo-data/generator', 'src/demo-data/generator'],
    ]}
    onLoadComplete={(args) => console.log('load complete', args)}
  >
    {() => <button type="submit">Upload to CodeSandbox</button>}
  </CodeSandboxer>
);
