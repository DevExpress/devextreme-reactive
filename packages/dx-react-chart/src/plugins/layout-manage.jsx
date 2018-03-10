import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import yoga, { Node } from 'yoga-layout';

const createNode = ({ flexGrow, flexDirection } = {}) => {
  const node = Node.create();
  node.setDisplay(yoga.DISPLAY_FLEX);
  if (flexGrow) node.setFlexGrow(flexGrow);
  if (flexDirection) node.setFlexDirection(flexDirection);
  return node;
};

const calculatePositions = (bBoxes, svgNode, width, height, x, y) => {
  svgNode.calculateLayout(width, height, yoga.DIRECTION_LTR);
  const positions = {};
  Object.keys(bBoxes).forEach((name) => {
    let node;
    if (name === 'year') {
      node = x;
    } else {
      node = y;
    }

    const bBox = bBoxes[name];
    const parent = node.getParent();
    positions[name] = {
      x: (parent.getComputedLeft() + node.getComputedLeft()) - bBox.x,
      y: (parent.getComputedTop() + node.getComputedTop()) - bBox.y,
      width: node.getComputedWidth(),
      height: node.getComputedHeight(),
    };
  });
  return positions;
};


const getComputedPosition = (positions, width, height) => name => (positions[name] || {
  x: 0, y: 0, width, height,
});

const isEqual = (firstBBox, secondBBox) =>
  firstBBox.width === secondBBox.width && firstBBox.height === secondBBox.height;

export class LayoutManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bBoxes: {},
    };

    this.createNodes();
    this.createBBoxSetter = this.createBBoxSetter.bind(this);
  }

  createNodes() {
    this.svg = createNode({ flexDirection: yoga.FLEX_DIRECTION_COLUMN });
    this.top = createNode({ flexGrow: 1, flexDirection: yoga.FLEX_DIRECTION_ROW });
    this.bottom = createNode({ flexDirection: yoga.FLEX_DIRECTION_ROW });

    this.yAxis = createNode();
    this.pane = createNode({ flexGrow: 1 });
    this.emptyBlock = createNode();
    this.xAxis = createNode({ flexGrow: 1 });

    this.svg.insertChild(this.top, 0);
    this.svg.insertChild(this.bottom, 1);

    this.top.insertChild(this.yAxis, 0);
    this.top.insertChild(this.pane, 1);

    this.bottom.insertChild(this.emptyBlock, 0);
    this.bottom.insertChild(this.xAxis, 1);
  }

  createBBoxSetter(name) {
    return (el) => {
      if (!el) {
        return;
      }
      const bBox = el.getBBox();
      this.setState((prevState) => {
        if (!(prevState.bBoxes[name] && isEqual(prevState.bBoxes[name], bBox))) {
          return { bBoxes: { ...prevState.bBoxes, [name]: bBox } };
        }
        return null;
      });
    };
  }

  updateNodes() {
    const { width, height } = this.props;
    const yAxisName = 'born';
    const xAxisName = 'year';
    this.svg.setWidth(width);
    this.svg.setHeight(height);

    this.yAxis.setWidth(this.state.bBoxes[yAxisName] ? this.state.bBoxes[yAxisName].width : 0);
    this.emptyBlock.setWidth(this.state.bBoxes[yAxisName] ? this.state.bBoxes[yAxisName].width : 0);
    this.xAxis.setHeight(this.state.bBoxes[xAxisName] ? this.state.bBoxes[xAxisName].height : 0);
    this.emptyBlock.setHeight(this.state.bBoxes[xAxisName] ?
      this.state.bBoxes[xAxisName].height
      : 0);
  }

  render() {
    const { width, height } = this.props;
    this.updateNodes();

    const positions = calculatePositions(
      this.state.bBoxes,
      this.svg,
      width,
      height,
      this.xAxis,
      this.yAxis,
    );

    return (
      <Plugin>
        <Getter name="createBBoxSetter" value={this.createBBoxSetter} />
        <Getter name="getPosition" value={getComputedPosition(positions, width, height)} />
      </Plugin>
    );
  }
}

LayoutManager.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
