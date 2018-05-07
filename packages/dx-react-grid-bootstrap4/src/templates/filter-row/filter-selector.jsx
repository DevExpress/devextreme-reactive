import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Popover, ListGroup, ListGroupItem } from 'reactstrap';

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
      value, availableValues, getMessage, iconComponent: Icon,
    } = this.props;
    const { opened } = this.state;
    const target = this.getTargetElement();
    return availableValues.length ? (
      <div className="input-group-prepend">
        <button
          className="btn btn-outline-secondary"
          disabled={availableValues.length <= 1}
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
              toggle={this.handleOverlayToggle}
            >
              <ListGroup>
                {availableValues.map(valueItem => (
                  <ListGroupItem
                    key={valueItem}
                    className="d-flex align-items-center dx-g-bs4-cursor-pointer dx-rg-bs4-filter-selector-item"
                    tag="button"
                    action
                    active={valueItem === value}
                    onClick={() => this.handleMenuItemClick(valueItem)}
                  >
                    <Icon type={valueItem} />
                    <span className="dx-rg-bs4-filter-selector-item-text">
                      {getMessage(valueItem)}
                    </span>
                  </ListGroupItem>
                ))}
              </ListGroup>
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
  iconComponent: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
};

FilterSelector.defaultProps = {
  value: undefined,
  availableValues: [],
  onChange: () => {},
};
