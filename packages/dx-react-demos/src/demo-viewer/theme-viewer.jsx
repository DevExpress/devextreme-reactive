import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { themes } from '../theme-registry';
import { ThemeSelector } from './theme-selector';

const THEME_STORAGE_KEY = 'devextreme-reactive/react/theme';
const VARIANT_STORAGE_KEY = 'devextreme-reactive/react/theme-variant';

let storage = { getItem: () => undefined, setItem: () => undefined };
try {
  storage = window.localStorage;
} catch (e) {} // eslint-disable-line no-empty

const ThemeViewerBase = (
  {
    avaliableThemes, match: { url }, history, children,
  },
  { embeddedDemoOptions: { showThemeVariants = false } },
) => {
  const preferredThemeName = storage.getItem(THEME_STORAGE_KEY) || themes[0].name;
  const preferredThemeAvaliable = avaliableThemes.indexOf(preferredThemeName) > -1;
  const fallbackThemeName = preferredThemeAvaliable ? preferredThemeName : avaliableThemes[0];

  const fallbackTheme = themes.find(({ name }) => name === fallbackThemeName);

  const preferredVariantName = showThemeVariants
    ? storage.getItem(VARIANT_STORAGE_KEY)
    : fallbackTheme.variants[0].name;
  const preferredVariantAvaliable = fallbackTheme.variants
    .some(({ name }) => name === preferredVariantName);
  const fallbackVariantName = preferredVariantAvaliable
    ? preferredVariantName
    : fallbackTheme.variants[0].name;

  const changeTheme = (theme, variant) => {
    storage.setItem(THEME_STORAGE_KEY, theme);
    storage.setItem(VARIANT_STORAGE_KEY, variant);
    history.push(`${url}/${theme}/${variant}`);
  };

  return (
    <Switch>
      <Route
        path={`${url}/:themeName/:variantName`}
        render={({ match: { params: { themeName, variantName } } }) => (
          <div>
            <ThemeSelector
              selectedThemeName={themeName}
              avaliableThemes={avaliableThemes}
              selectedVariantName={variantName}
              onChange={changeTheme}
            />
            <div>
              {children({ themeName, variantName })}
            </div>
          </div>
        )}
      />
      <Redirect from={`${url}`} to={`${url}/${fallbackThemeName}/${fallbackVariantName}`} />
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

ThemeViewerBase.contextTypes = {
  embeddedDemoOptions: PropTypes.object.isRequired,
};

export const ThemeViewer = withRouter(ThemeViewerBase);
