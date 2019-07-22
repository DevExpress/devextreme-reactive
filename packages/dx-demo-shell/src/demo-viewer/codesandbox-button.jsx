import * as React from 'react';
import { getParameters } from "codesandbox/lib/api/define";

export const CodeSandBoxButton = ({
  code, html, helperFiles, themeName,
  sectionName, demoName,
}) => {
  const helpers = Object.entries(helperFiles).reduce((acc, [name, content]) => ({
    ...acc,
    [name]: { content },
  }), {});

  const parameters = getParameters({
    files: {
      "package.json": {
        content: {
          dependencies: {
            react: "latest",
            "react-dom": "latest"
          }
        }
      },
      "index.js": {
        content: code
      },
      "index.html": {
        content: html
      },
      ...helpers,
    }
  });


  return (
    <form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
      <input type="hidden" name="parameters" value={parameters} />
      <input type="submit" value="Open in sandbox" />
    </form>
  );
};
