import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Overlay } from '../parts/overlay';

export class FilterSelector extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { opened: false };

    this.handleButtonClick = () => {
      this.setState(prevState => ({ opened: !prevState.opened }));
    };
    this.handleOverlayHide = () => {
      this.setState({ opened: false });
    };
    this.handleMenuItemClick = (nextValue) => {
      this.setState({ opened: false });
      const { onChange } = this.props;
      onChange(nextValue);
    };
  }

  render() {
    const {
      value, availableValues, disabled, getMessage,
      iconComponent: Icon, toggleButtonComponent: ToggleButton,
    } = this.props;
    const { opened } = this.state;

    return availableValues.length ? (
      <span className="input-group-btn">
        <ToggleButton
          disabled={disabled || availableValues.length === 1}
          onToggle={this.handleButtonClick}
          buttonRef={(ref) => { this.targetElement = ref; }}
        >
          <Icon type={value} />
        </ToggleButton>
        <Overlay
          visible={opened}
          target={this.targetElement}
          onHide={this.handleOverlayHide}
          container={undefined}
        >
          <ListGroup
            style={{ marginBottom: 0 }}
          >
            {availableValues.map(valueItem => (
              <ListGroupItem
                key={valueItem}
                active={valueItem === value}
                style={{
                  outline: 'none',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => this.handleMenuItemClick(valueItem)}
              >
                <Icon type={valueItem} />
                <span style={{ marginLeft: 10 }}>
                  {getMessage(valueItem)}
                </span>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Overlay>
      </span>
    ) : null;
  }
}

FilterSelector.propTypes = {
  value: PropTypes.string,
  availableValues: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  iconComponent: PropTypes.func.isRequired,
  toggleButtonComponent: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
};

FilterSelector.defaultProps = {
  value: undefined,
  availableValues: [],
  onChange: () => {},
  disabled: false,
};
