import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, MenuItem } from 'react-bootstrap';

import './theme-selector.css';
import { themes } from '../demo-registry';

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

export const ThemeSelector = ({ selectedTheme, avaliableThemes, onThemeSelect }) => (
  <Dropdown
    id="theme-toggle"
    className="template-chooser"
    onSelect={(theme) => {
      if (selectedTheme !== theme) onThemeSelect(theme);
    }}
  >
    <Toggle bsRole="toggle">{themes.find(({ name }) => name === selectedTheme).title}</Toggle>
    <Dropdown.Menu>
      {themes.map(({ name, title }) => {
        const active = name === selectedTheme;
        const avaliable = avaliableThemes.indexOf(name) > -1;
        return (
          <MenuItem
            key={name}
            eventKey={name}
            disabled={!avaliable}
            active={active}
          >
            {title}{!avaliable && ' (coming soon)'}
          </MenuItem>
        );
      })}
    </Dropdown.Menu>
  </Dropdown>
);

ThemeSelector.propTypes = {
  selectedTheme: PropTypes.string.isRequired,
  avaliableThemes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onThemeSelect: PropTypes.func.isRequired,
};
