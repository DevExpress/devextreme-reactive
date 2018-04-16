import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Dropdown, MenuItem } from 'react-bootstrap';

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
        <span className="caption">{children}</span>
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

export const ThemeSelector = (
  {
    selectedThemeName, selectedVariantName, avaliableThemes, onChange,
  },
  { embeddedDemoOptions: { showThemeVariants, themeSources } },
) => {
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
        {themeSources.map(({ name: themeName, title: themeTitle, variants }) => {
          const avaliable = avaliableThemes.indexOf(themeName) > -1;
          const activeTheme = themeName === selectedThemeName;

          if (!showThemeVariants) {
            return (
              <MenuItem
                key={themeName}
                eventKey={`${themeName}|${variants[0].name}`}
                disabled={!avaliable}
                active={activeTheme}
              >
                {themeTitle}{!avaliable && ' (coming soon)'}
              </MenuItem>
            );
          }
          return variants.map(({ name: variantName, title: variantTitle }) => {
            const activeVariant = variantName === selectedVariantName;

            return (
              <MenuItem
                key={`${themeName}|${variantName}`}
                eventKey={`${themeName}|${variantName}`}
                disabled={!avaliable}
                active={activeTheme && activeVariant}
              >
                {variantTitle}{!avaliable && ' (coming soon)'}
              </MenuItem>
            );
          });
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

ThemeSelector.propTypes = {
  selectedThemeName: PropTypes.string.isRequired,
  selectedVariantName: PropTypes.string.isRequired,
  avaliableThemes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

ThemeSelector.contextTypes = {
  embeddedDemoOptions: PropTypes.object.isRequired,
};
