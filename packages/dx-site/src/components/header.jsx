import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './header.module.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    const { visibility } = this.state;
    this.setState({ visibility: !visibility });
  }

  render() {
    const { logo, links, addon } = this.props;
    const { visibility } = this.state;
    return (
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <div className="row align-items-center">
            <div className="col-auto mr-auto">
              {logo}
            </div>
            <div className="col-auto">
              <button
                className="d-block d-sm-none"
                type="button"
                onClick={this.toggleVisibility}
              >
                Menu
              </button>
              <div
                className={`${styles.links} ${visibility ? styles.opened : ''}`}
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

Header.propTypes = {
  logo: PropTypes.node.isRequired,
  links: PropTypes.node,
  addon: PropTypes.node,
};

Header.defaultProps = {
  links: undefined,
  addon: undefined,
};

export default Header;
