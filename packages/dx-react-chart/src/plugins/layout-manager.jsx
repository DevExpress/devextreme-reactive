import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Getter,
  Action,
  Template,
  TemplatePlaceholder,
  createStateHelper,
} from '@devexpress/dx-react-core';
import { bBoxes } from '@devexpress/dx-chart-core';

export class LayoutManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = { bBoxes: { pane: { width: this.props.width, height: this.props.height } } };

    const stateHelper = createStateHelper(this);

    this.changeBBox = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'bBoxes',
      bBoxes,
    );
  }

  render() {
    const {
      width, height, rootComponent: Root, ...restProps
    } = this.props;

    return (
      <Plugin>
        <Getter name="layouts" value={this.state.bBoxes} />
        <Action name="changeBBox" action={this.changeBBox} />

        <Template name="root">
          <Root
            height={height}
            width={width}
            {...restProps}
          >
            <TemplatePlaceholder name="canvas" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}

LayoutManager.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number.isRequired,
  rootComponent: PropTypes.func.isRequired,
};

LayoutManager.defaultProps = {
  width: 0,
};
