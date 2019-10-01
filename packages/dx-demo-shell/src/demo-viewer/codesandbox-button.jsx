import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getParameters } from 'codesandbox/lib/api/define';
import './codesandbox-button.css';

const indexCode = `
import React from "react";
import { render } from "react-dom";
import Demo from "./demo";

render(<Demo />, document.getElementById("root"));
`;

export const CodeSandBoxButton = ({
  code, sandboxHtml, helperFiles, externalDeps, themeName,
  sectionName, demoName,
}) => {
  const helpers = Object.entries(helperFiles).reduce((acc, [name, content]) => ({
    ...acc,
    [name]: { content },
  }), {});

  const parameters = getParameters({
    files: {
      'package.json': {
        content: {
          dependencies: {
            'react-dom': 'latest',
            ...externalDeps,
          },
        },
      },
      'index.js': {
        content: indexCode,
      },
      'demo.js': {
        content: code,
      },
      'index.html': {
        content: sandboxHtml,
      },
      ...helpers,
    },
  });


  return (
    <form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
      <input type="hidden" name="parameters" value={parameters} />
      <input type="submit" value="Open in CodeSandbox" className="btn-outline-primary codesandbox-button" />
    </form>
  );
};


CodeSandBoxButton.propTypes = {
  code: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  helperFiles: PropTypes.array.isRequired,
  themeName: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  demoName: PropTypes.string.isRequired,
};
