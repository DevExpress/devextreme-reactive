import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';


const isEqual = (
  { width: firstWidth, height: firstHeight },
  { width: secondWidth, height: secondHeight },
) => firstWidth === secondWidth && firstHeight === secondHeight;

export class LayoutManager extends React.Component {
  constructor(props) {
    super(props);
    const { width, height } = this.props;

    this.state = {
      bBoxes: {
        root: {
          width,
          height,
        },
      },
    };

    this.setBBox = this.setBBox.bind(this);
  }

  setBBox(placeholder, bBox) {
    this.setState((prevState) => {
      if (isEqual(prevState.bBoxes[placeholder] || {}, bBox)) return null;
      return ({ bBoxes: { ...prevState.bBoxes, [placeholder]: bBox } });
    });
  }

  render() {
    const {
      width,
      height,
      rootComponent: Root,
      ...restProps
    } = this.props;

    const { bBoxes } = this.state;

    return (
      <Plugin>
        <Getter name="setBBox" value={this.setBBox} />
        <Getter name="layouts" value={bBoxes} />
        <Getter name="height" value={height} />
        <Getter name="width" value={width} />
        <Template name="root">
          <Root width={width} height={height} {...restProps}>
            <TemplatePlaceholder name="canvas" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}

LayoutManager.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rootComponent: PropTypes.func.isRequired,
};
