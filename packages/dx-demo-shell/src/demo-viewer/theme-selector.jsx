import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { EmbeddedDemoContext } from '../context';

import './theme-selector.css';

class Toggle extends React.PureComponent {
  render() {
    const { children, onClick } = this.props;

    return (
      <a
        className="toggle"
        href=""
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        <span className="caption">
          {children}
        </span>
        <span className="caret" />
      </a>
    );
  }
}

Toggle.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Toggle.defaultProps = {
  onClick: () => {},
};

export const ThemeSelector = ({
  selectedThemeName, selectedVariantName, availableThemes, onChange,
}) => (
  <EmbeddedDemoContext.Consumer>
    {({ showThemeVariants, themeSources }) => {
      const selectedTheme = themeSources.find(({ name }) => name === selectedThemeName);
      return (
        <Dropdown
          id="theme-toggle"
          className="template-chooser"
          onSelect={(eventKey) => {
            const [theme, variant] = eventKey.split('|');
            if (selectedThemeName !== theme || selectedVariantName !== variant) {
              onChange(theme, variant);
            }
          }}
        >
          <Toggle bsRole="toggle">
            {showThemeVariants
              ? selectedTheme.variants.find(({ name }) => name === selectedVariantName).title
              : selectedTheme.title}
          </Toggle>
          <Dropdown.Menu>
            {themeSources.reduce((acc, { name: themeName, title: themeTitle, variants }) => {
              const available = availableThemes.indexOf(themeName) > -1;
              const activeTheme = themeName === selectedThemeName;

              if (!available) return acc;
              if (!showThemeVariants) {
                acc.push(
                  <MenuItem
                    key={themeName}
                    eventKey={`${themeName}|${variants[0].name}`}
                    active={activeTheme}
                  >
                    {themeTitle}
                  </MenuItem>,
                );
              } else {
                acc.push(variants.map(({ name: variantName, title: variantTitle }) => {
                  const activeVariant = variantName === selectedVariantName;

                  return (
                    <MenuItem
                      key={`${themeName}|${variantName}`}
                      eventKey={`${themeName}|${variantName}`}
                      active={activeTheme && activeVariant}
                    >
                      {variantTitle}
                    </MenuItem>
                  );
                }));
              }
              return acc;
            }, [])}
          </Dropdown.Menu>
        </Dropdown>
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
