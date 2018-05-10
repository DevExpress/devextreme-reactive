import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Popover } from 'reactstrap';
import classNames from 'classnames';

export class FilterSelector extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { opened: false };

    this.handleButtonClick = () => {
      this.setState({ opened: !this.state.opened });
    };
    this.handleOverlayToggle = () => {
      if (this.state.opened) this.setState({ opened: false });
    };
    this.handleMenuItemClick = (nextValue) => {
      this.setState({ opened: false });
      this.props.onChange(nextValue);
    };

    this.getTargetElement = () => this.targetElement;
  }
  render() {
    const {
      value, availableValues, disabled, getMessage, iconComponent: Icon,
    } = this.props;
    const { opened } = this.state;
    const target = this.getTargetElement();
    return availableValues.length ? (
      <div className="input-group-prepend">
        <button
          className="btn btn-outline-secondary"
          disabled={disabled || availableValues.length === 1}
          onClick={this.handleButtonClick}
          ref={(ref) => { this.targetElement = ref; }}
        >
          <Icon type={value} />
        </button>
        {
          target ? (
            <Popover
              placement="bottom"
              isOpen={opened}
              target={target}
              container={target.parentElement}
              toggle={this.handleOverlayToggle}
            >
              <div className="py-2">
                {availableValues.map(valueItem => (
                  <button
                    key={valueItem}
                    className={classNames({
                      'dropdown-item d-flex align-items-center': true,
                      'dx-g-bs4-cursor-pointer dx-g-bs4-filter-selector-item': true,
                      active: valueItem === value,
                    })}
                    onClick={() => this.handleMenuItemClick(valueItem)}
                  >
                    <Icon type={valueItem} />
                    <span className="dx-g-bs4-filter-selector-item-text">
                      {getMessage(valueItem)}
                    </span>
                  </button>
                ))}
              </div>
            </Popover>
          ) : null
        }
      </div>
    ) : null;
  }
}

FilterSelector.propTypes = {
  value: PropTypes.string,
  availableValues: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  iconComponent: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
};

FilterSelector.defaultProps = {
  value: undefined,
  availableValues: [],
  onChange: () => {},
  disabled: false,
};
