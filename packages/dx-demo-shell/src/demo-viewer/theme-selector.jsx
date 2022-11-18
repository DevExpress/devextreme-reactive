import * as React from 'react';
import PropTypes from 'prop-types';
import {
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { EmbeddedDemoContext } from '../context';
import './theme-selector.css';

export const ThemeSelector = ({
  selectedThemeName,
  selectedVariantName,
  availableThemes,
  onChange,
}) => (
  <EmbeddedDemoContext.Consumer>
    {({ showThemeVariants, themeSources }) => {
      const selectedTheme = themeSources.find(({ name }) => name === selectedThemeName);
      return (
        <UncontrolledDropdown
          className="theme-selector"
        >
          <DropdownToggle
            tag="span"
            caret
          >
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {showThemeVariants
                ? selectedTheme.variants.find(({ name }) => name === selectedVariantName).title
                : selectedTheme.title}
            </a>
          </DropdownToggle>
          <DropdownMenu right>
            {themeSources.reduce((acc, { name: themeName, title: themeTitle, variants }) => {
              const available = availableThemes.indexOf(themeName) > -1;
              const activeTheme = themeName === selectedThemeName;

              if (!available) return acc;
              if (!showThemeVariants) {
                acc.push(
                  <DropdownItem
                    key={themeName}
                    active={activeTheme}
                    onClick={() => {
                      if (selectedThemeName !== themeName) {
                        onChange(themeName, variants[0].name);
                      }
                    }}
                  >
                    {themeTitle}
                  </DropdownItem>,
                );
              } else {
                acc.push(variants.map(({ name: variantName, title: variantTitle }) => {
                  const activeVariant = variantName === selectedVariantName;

                  return (
                    <DropdownItem
                      key={`${themeName}|${variantName}`}
                      active={activeTheme && activeVariant}
                      onClick={() => {
                        if (selectedThemeName !== themeName
                          || selectedVariantName !== variantName) {
                          onChange(themeName, variantName);
                        }
                      }}
                    >
                      {variantTitle}
                    </DropdownItem>
                  );
                }));
              }
              return acc;
            }, [])}
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }}
  </EmbeddedDemoContext.Consumer>
);

ThemeSelector.propTypes = {
  selectedThemeName: PropTypes.string.isRequired,
  selectedVariantName: PropTypes.string.isRequired,
  availableThemes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};
