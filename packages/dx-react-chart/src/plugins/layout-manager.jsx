import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { TOP, BOTTOM, LEFT, RIGHT } from '@devexpress/dx-chart-core';
import yoga, { Node } from '@devexpress/dx-flex-layout';

const LayoutElement = () => null;

const isEqual = (
  { width: firstWidth, height: firstHeight },
  { width: secondWidth, height: secondHeight },
) => firstWidth === secondWidth && firstHeight === secondHeight;

const createNode = ({
  flexGrow, flexDirection, width, height, margin, alignItems, flexWrap, justifyContent,
} = {}) => {
  const node = Node.create();
  node.setDisplay(yoga.DISPLAY_FLEX);
  if (flexGrow) node.setFlexGrow(flexGrow);
  if (flexDirection) node.setFlexDirection(flexDirection);
  if (width) node.setWidth(width);
  if (height) node.setHeight(height);
  if (margin) node.setMargin(yoga.EDGE_ALL, margin);
  if (alignItems) node.setAlignItems(alignItems);
  if (flexWrap) node.setFlexWrap(flexWrap);
  if (justifyContent) node.setJustifyContent(justifyContent);
  return node;
};

const getPosition = (node, positions, methodName) => {
  const parent = node.getParent();
  if (parent) {
    return getPosition(parent, (positions + parent[methodName]()), methodName);
  }
  return positions;
};

const getXPosition = (node, positions) => getPosition(node, positions, 'getComputedLeft');
const getYPosition = (node, positions) => getPosition(node, positions, 'getComputedTop');

const getAbsoluteNodePosition = node => ({
  x: getXPosition(node, node.getComputedLeft()),
  y: getYPosition(node, node.getComputedTop()),
  width: node.getComputedWidth(),
  height: node.getComputedHeight(),
});

const calculatePositions = (rootNode, width, height, nodes) => {
  const positions = {};
  rootNode.calculateLayout(width, height, yoga.DIRECTION_LTR);
  nodes.forEach(({ node }, name) => {
    positions[name] = getAbsoluteNodePosition(node);
  });
  return positions;
};

const copyHeightWidthFrom = (verticalNodeName, horizontalNodeName) => (node, nodes) => {
  const { node: xNode } = nodes.get(horizontalNodeName);
  const { node: yNode } = nodes.get(verticalNodeName);
  const { width } = xNode.getComputedLayout();
  const { height } = yNode.getComputedLayout();
  node.setWidth(width || 0);
  node.setHeight(height || 0);
};

export class LayoutManager extends React.Component {
  constructor(props) {
    super(props);
    const { width, height, children } = this.props;

    this.state = {
    // eslint-disable-next-line react/no-unused-state
      bBoxes: {
        root: {
          width,
          height,
        },
      },
    };

    this.nodes = new Map();
    this.rootNode = this.createNodes(children);
    this.rootNode.setWidth(width);
    this.rootNode.setHeight(height);
    this.setBBox = this.setBBox.bind(this);
    this.addNodes = this.addNodes.bind(this);
  }

  setBBox(placeholder, bBox) {
    this.setState((prevState) => {
      if (isEqual(prevState.bBoxes[placeholder] || {}, bBox)) return null;
      return ({ bBoxes: { ...prevState.bBoxes, [placeholder]: bBox } });
    });
    const { node } = this.nodes.get(placeholder);
    if (bBox.width) node.setWidth(bBox.width);
    if (bBox.height) node.setHeight(bBox.height);
    this.rootNode.calculateLayout();
  }

  addNodes(children, placeholder) {
    const { node } = this.nodes.get(placeholder);
    if (!node.getChildCount()) {
      node.insertChild(this.createNodes(children));
    }
  }

  createNodes(children) {
    const {
      name, bBoxHandler,
    } = children.props;
    const node = createNode(children.props);

    this.nodes.set(name, {
      node,
      bBoxHandler,
    });

    React.Children.forEach(children.props.children, (child, index) => {
      node.insertChild(this.createNodes(child), index);
    });

    return node;
  }


  updateNodes() {
    this.nodes.forEach(({ node, bBoxHandler }) => {
      if (bBoxHandler) {
        bBoxHandler(node, this.nodes);
      }
    });
  }

  render() {
    const {
      width,
      height,
    } = this.props;

    this.updateNodes(this.rootNode);
    const positions = calculatePositions(
      this.rootNode,
      width,
      height,
      this.nodes,
    );

    return (
      <Plugin>
        <Getter name="addNodes" value={this.addNodes} />
        <Getter name="setBBox" value={this.setBBox} />
        <Getter name="layouts" value={positions} />
        <Getter name="height" value={height} />
        <Getter name="width" value={width} />
      </Plugin>
    );
  }
}

LayoutManager.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.node,
};

LayoutManager.defaultProps = {
  children: (
    <LayoutElement
      name="root"
      flexDirection={yoga.FLEX_DIRECTION_COLUMN}
    >
      <LayoutElement name="top-container" flexDirection={yoga.FLEX_DIRECTION_ROW} >
        <LayoutElement
          name="top-left"
          bBoxHandler={copyHeightWidthFrom(TOP, LEFT)}
        />
        <LayoutElement
          name="top"
          flexGrow={1}
          justifyContent={yoga.JUSTIFY_CENTER}
          flexDirection={yoga.FLEX_DIRECTION_ROW}
        />
        <LayoutElement
          name="top-right"
          bBoxHandler={copyHeightWidthFrom(TOP, RIGHT)}
        />
      </LayoutElement>
      <LayoutElement name="center-container" flexGrow={1} flexDirection={yoga.FLEX_DIRECTION_ROW}>
        <LayoutElement
          name="left"
          justifyContent={yoga.JUSTIFY_FLEX_START}
        />
        <LayoutElement name="center-center" flexGrow={1}>
          <LayoutElement name="top-axis-container" flexDirection={yoga.FLEX_DIRECTION_ROW} >
            <LayoutElement
              name="top-left-axis"
              bBoxHandler={copyHeightWidthFrom(`${TOP}-axis`, `${LEFT}-axis`)}
            />
            <LayoutElement name="top-axis" flexGrow={1} />
            <LayoutElement
              name="top-right-axis"
              bBoxHandler={copyHeightWidthFrom(`${TOP}-axis`, `${RIGHT}-axis`)}
            />
          </LayoutElement>
          <LayoutElement name="center-axis-container" flexGrow={1} flexDirection={yoga.FLEX_DIRECTION_ROW}>
            <LayoutElement name="left-axis" />
            <LayoutElement name="pane" flexGrow={1} />
            <LayoutElement name="right-axis" />
          </LayoutElement>
          <LayoutElement name="bottom-axis-container" flexDirection={yoga.FLEX_DIRECTION_ROW}>
            <LayoutElement
              name="bottom-left-axis"
              bBoxHandler={copyHeightWidthFrom(`${BOTTOM}-axis`, `${LEFT}-axis`)}
            />
            <LayoutElement name="bottom-axis" flexGrow={1} />
            <LayoutElement
              name="bottom-right-axis"
              bBoxHandler={copyHeightWidthFrom(`${BOTTOM}-axis`, `${RIGHT}-axis`)}
            />
          </LayoutElement>
        </LayoutElement>
        <LayoutElement
          name="right"
          justifyContent={yoga.JUSTIFY_FLEX_START}
        />
      </LayoutElement>
      <LayoutElement name="bottom-container" flexDirection={yoga.FLEX_DIRECTION_ROW}>
        <LayoutElement
          name="bottom-left"
          bBoxHandler={copyHeightWidthFrom(BOTTOM, LEFT)}
        />
        <LayoutElement
          name="bottom"
          flexGrow={1}
          flexDirection={yoga.FLEX_DIRECTION_ROW}
          justifyContent={yoga.JUSTIFY_CENTER}
        />
        <LayoutElement
          name="bottom-right"
          bBoxHandler={copyHeightWidthFrom(BOTTOM, RIGHT)}
        />
      </LayoutElement>
    </LayoutElement>
  ),
};
