import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { themes } from '../demo-registry';
import { ThemeSelector } from './theme-selector';

const STORAGE_KEY = 'devextreme-reactive/react/theme';

let storage = { getItem: () => undefined, setItem: () => undefined };
try {
  storage = window.localStorage;
} catch (e) {} // eslint-disable-line no-empty

const ThemeViewerBase = ({
  avaliableThemes, match: { url }, history, children,
}) => {
  const preferredTheme = storage.getItem(STORAGE_KEY) || themes[0].name;
  const preferredThemeAvaliable = avaliableThemes.indexOf(preferredTheme) > -1;
  const defaultTheme = preferredThemeAvaliable ? preferredTheme : avaliableThemes[0];

  const changeTheme = (theme) => {
    storage.setItem(STORAGE_KEY, theme);
    history.push(`${url}/${theme}`);
  };

  return (
    <Switch>
      <Route
        path={`${url}/:theme`}
        render={({ match: { params: { theme: currentTheme } } }) => (
          <div>
            <ThemeSelector
              selectedTheme={currentTheme}
              avaliableThemes={avaliableThemes}
              onThemeSelect={changeTheme}
            />
            <div>
              {children({ theme: currentTheme })}
            </div>
          </div>
        )}
      />
      <Redirect from={`${url}`} to={`${url}/${defaultTheme}`} />
    </Switch>
  );
};

ThemeViewerBase.propTypes = {
  avaliableThemes: PropTypes.arrayOf(PropTypes.string),
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
};

ThemeViewerBase.defaultProps = {
  avaliableThemes: themes.map(theme => theme.name),
};

export const ThemeViewer = withRouter(ThemeViewerBase);
