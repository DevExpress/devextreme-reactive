import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Overlay } from '../parts/overlay';

export class FilterSelector extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { opened: false };

    this.handleButtonClick = () => {
      this.setState({ opened: true });
    };
    this.handleOverlayHide = () => {
      this.setState({ opened: false });
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

    return availableValues.length ? (
      <React.Fragment>
        <button
          className="btn btn-link"
          style={{
            marginRight: 5,
            color: 'black',
            flex: '0 0 auto',
          }}
          disabled={availableValues.length <= 1}
          onClick={this.handleButtonClick}
          ref={(ref) => { this.targetElement = ref; }}
        >
          <Icon type={value} />
        </button>
        <Overlay
          visible={opened}
          target={this.getTargetElement()}
          container={undefined}
          onHide={this.handleOverlayHide}
        >
          <ListGroup
            style={{ marginBottom: 0 }}
          >
            {availableValues.map(valueItem => (
              <ListGroupItem
                key={valueItem}
                active={valueItem === value}
                style={{ outline: 'none', whiteSpace: 'nowrap' }}
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
      </React.Fragment>
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
