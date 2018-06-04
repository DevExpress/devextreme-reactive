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

    this.state = { bBoxes: {}, width: 400, height: 500 };

    const stateHelper = createStateHelper(this);

    this.changeBBox = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'bBoxes',
      bBoxes,
    );
    this.change = width => this.setState({ width });
    this.changeWidth = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'changeWidth',
      (prev, next) => (prev === next ? prev : next),
    );
    this.changeHeight = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'changeHeight',
      (prev, next) => (prev === next ? prev : next),
    );
  }

  render() {
    const {
      rootComponent: Root, ...restProps
    } = this.props;

    return (
      <Plugin>
        <Getter name="layouts" value={this.state.bBoxes} />
        <Action name="changeBBox" action={this.changeBBox} />
        <Action name="changeWidth" action={this.change} />
        <Action name="changeHeight" action={this.changeHeight} />

        <Getter name="height" value={this.state.height} />
        <Getter name="width" value={this.state.width} />

        <Template name="root">
          <Root
            height={this.state.height}
            {...restProps}
          >
            <TemplatePlaceholder name="canvas" />
          </Root>
        </Template>
      </Plugin >
    );
  }
}

LayoutManager.propTypes = {
  rootComponent: PropTypes.func.isRequired,
};
