/* eslint-disable jsx-a11y/control-has-associated-label */
/* globals document:true */
import * as React from 'react';
import PropTypes from 'prop-types';
import ProductLogo from './logos/product';

import styles from './header.module.scss';

class Header extends React.Component {
  static propTypes = {
    page: PropTypes.string,
    links: PropTypes.node,
    addon: PropTypes.node,
  };

  static defaultProps = {
    page: undefined,
    links: undefined,
    addon: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      menuVisibility: false,
    };
    this.toggleMenuVisibility = this.toggleMenuVisibility.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.menuRef = React.createRef();
  }

  handleOutsideClick(e) {
    if (this.menuRef.current.contains(e.target)) {
      return;
    }
    this.toggleMenuVisibility();
  }

  toggleMenuVisibility(e) {
    e.stopPropagation();

    const { menuVisibility } = this.state;
    if (!menuVisibility) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState({ menuVisibility: !menuVisibility });
  }

  render() {
    const { links, addon, page } = this.props;
    const { menuVisibility } = this.state;

    return (
      <header className={`${styles.header} ${page ? styles[page] : ''} `}>
        <div className={`container ${styles.headerContainer}`}>
          <div className="row align-items-center">
            <div className="col-auto mr-auto">
              <ProductLogo />
            </div>
            <div className="col-auto">
              <button
                className={`${styles.menuSandwich} ${menuVisibility ? styles.clicked : ''}`}
                type="button"
                onClick={this.toggleMenuVisibility}
              />
              <div
                className={`${styles.links} ${menuVisibility ? styles.opened : ''}`}
                ref={this.menuRef}
              >
                {links}
                <a
                  href="https://community.devexpress.com/tags/DevExtreme+Reactive/default.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
                <a
                  href="https://github.com/DevExpress/devextreme-reactive"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://js.devexpress.com/Buy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy
                </a>
              </div>
            </div>
          </div>
        </div>
        {addon}
      </header>
    );
  }
}

export default Header;
