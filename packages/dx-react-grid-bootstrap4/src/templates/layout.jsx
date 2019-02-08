/* globals document:true window:true */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const BodyColorContext = React.createContext();

const getBodyColor = () => {
  const body = document.getElementsByTagName('body')[0];
  const { backgroundColor } = window.getComputedStyle(body);

  return backgroundColor;
};

export class Root extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: undefined,
    };
  }

  componentDidMount() {
    this.setState({
      backgroundColor: getBodyColor(),
    });
  }

  render() {
    const { children, className, ...restProps } = this.props;
    const { backgroundColor } = this.state;
    return (
      <div
        className={classNames('d-flex flex-column', className)}
        {...restProps}
      >
        <BodyColorContext.Provider value={backgroundColor}>
          {children}
        </BodyColorContext.Provider>
      </div>
    );
  }
}

Root.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Root.defaultProps = {
  className: undefined,
  children: undefined,
};
