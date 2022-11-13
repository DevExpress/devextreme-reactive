import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Route, Switch, Redirect, withRouter,
} from 'react-router-dom';

import { ThemeSelector } from './theme-selector';
import { EmbeddedDemoContext } from '../context';

const THEME_STORAGE_KEY = 'devextreme-reactive/react/theme';
const VARIANT_STORAGE_KEY = 'devextreme-reactive/react/theme-variant';

let storage = { getItem: () => undefined, setItem: () => undefined };
try {
  storage = window.localStorage;
} catch (e) {} // eslint-disable-line no-empty

const ThemeViewerBase = ({
  availableThemes, match: { url }, history, children,
}) => (
  <EmbeddedDemoContext.Consumer>
    {({ themeSources, showThemeVariants, showThemeSelector }) => {
      const normalizedAvailableThemes = availableThemes || themeSources.map(theme => theme.name);

      const preferredThemeName = storage.getItem(THEME_STORAGE_KEY) || themeSources[0].name;
      const preferredThemeAvailable = normalizedAvailableThemes.indexOf(preferredThemeName) > -1;
      const fallbackThemeName = preferredThemeAvailable
        ? preferredThemeName : normalizedAvailableThemes[0];

      const fallbackTheme = themeSources.find(({ name }) => name === fallbackThemeName);

      const preferredVariantName = showThemeVariants
        ? storage.getItem(VARIANT_STORAGE_KEY)
        : fallbackTheme.variants[0].name;
      const preferredVariantAvailable = fallbackTheme.variants
        .some(({ name }) => name === preferredVariantName);
      const fallbackVariantName = preferredVariantAvailable
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
                {(showThemeSelector && (
                  <ThemeSelector
                    selectedThemeName={themeName}
                    availableThemes={normalizedAvailableThemes}
                    selectedVariantName={variantName}
                    onChange={changeTheme}
                  />
                ))}
                <div>
                  {children({ themeName, variantName })}
                </div>
              </div>
            )}
          />
          <Redirect from={`${url}`} to={`${url}/${fallbackThemeName}/${fallbackVariantName}`} />
        </Switch>
      );
    }}
  </EmbeddedDemoContext.Consumer>
);

ThemeViewerBase.propTypes = {
  availableThemes: PropTypes.arrayOf(PropTypes.string),
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
};

ThemeViewerBase.defaultProps = {
  availableThemes: undefined,
};

export const ThemeViewer = withRouter(ThemeViewerBase);
