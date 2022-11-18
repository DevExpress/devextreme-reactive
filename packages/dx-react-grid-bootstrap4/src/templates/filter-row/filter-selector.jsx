import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { Popover } from '../../../../dx-react-bootstrap4/components';

export class FilterSelector extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { opened: false };

    this.handleButtonClick = () => {
      this.setState(prevState => ({ opened: !prevState.opened }));
    };
    this.handleOverlayToggle = () => {
      const { opened } = this.state;
      if (opened) this.setState({ opened: false });
    };
    this.handleMenuItemClick = (nextValue) => {
      const { onChange } = this.props;
      this.setState({ opened: false });
      onChange(nextValue);
    };
  }

  render() {
    const {
      value, availableValues, disabled, getMessage,
      iconComponent: Icon, toggleButtonComponent: ToggleButton,
      className, ...restProps
    } = this.props;
    const { opened } = this.state;
    return availableValues.length ? (
      <div
        className={classNames('input-group-prepend', className)}
        {...restProps}
      >
        <ToggleButton
          disabled={disabled || availableValues.length === 1}
          onToggle={this.handleButtonClick}
          buttonRef={(ref) => { this.targetElement = ref; }}
        >
          <Icon type={value} />
        </ToggleButton>
        {
          this.targetElement ? (
            <Popover
              placement="bottom"
              isOpen={opened}
              target={this.targetElement}
              toggle={this.handleOverlayToggle}
            >
              <div className="py-2">
                {availableValues.map(valueItem => (
                  <button
                    type="button"
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
  // oneOfType is a workaround because React.memo returns react object
  iconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  toggleButtonComponent: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
};

FilterSelector.defaultProps = {
  value: undefined,
  availableValues: [],
  onChange: () => {},
  disabled: false,
  className: undefined,
};
