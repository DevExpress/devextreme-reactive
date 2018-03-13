import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import yoga, { Node } from 'yoga-layout';

const LayoutElement = () => null;

const createNode = ({ flexGrow, flexDirection } = {}) => {
  const node = Node.create();
  node.setDisplay(yoga.DISPLAY_FLEX);
  if (flexGrow) node.setFlexGrow(flexGrow);
  if (flexDirection) node.setFlexDirection(flexDirection);
  return node;
};

const getAbsoluteNodePosition = (node) => {
  const parent = node.getParent();
  return {
    x: (parent && parent.getComputedLeft() + node.getComputedLeft()),
    y: (parent && parent.getComputedTop() + node.getComputedTop()),
    width: node.getComputedWidth(),
    height: node.getComputedHeight(),
  };
};

const calculatePositions = (bBoxes, rootNode, width, height, nodes) => {
  rootNode.calculateLayout(width, height, yoga.DIRECTION_LTR);
  return nodes.reduce((positions, { name, node }) =>
    ({ ...positions, [name]: getAbsoluteNodePosition(node) }), {});
};

const isEqual = (firstBBox, secondBBox) =>
  firstBBox.width === secondBBox.width && firstBBox.height === secondBBox.height;

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

    this.nodes = [];
    this.rootNode = this.createNodes(props.children);
    this.createBBoxSetter = this.createBBoxSetter.bind(this);
  }

  createNodes(children) {
    const {
      flexDirection, flexGrow, name, bBoxHandler,
    } = children.props;
    const node = createNode({
      flexDirection,
      flexGrow,
    });

    this.nodes.push({
      name,
      node,
      bBoxHandler,
    });

    React.Children.forEach(children.props.children, (child, index) => {
      node.insertChild(this.createNodes(child), index);
    });

    return node;
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
    this.nodes.forEach(({ node, bBoxHandler }) => {
      if (bBoxHandler) {
        bBoxHandler(this.state.bBoxes, node);
      }
    });
  }

  render() {
    const { width, height } = this.props;
    this.updateNodes(this.rootNode);

    const positions = calculatePositions(
      this.state.bBoxes,
      this.rootNode,
      width,
      height,
      this.nodes,
    );

    return (
      <Plugin>
        <Getter name="createBBoxSetter" value={this.createBBoxSetter} />
        <Getter name="layouts" value={positions} />
      </Plugin>
    );
  }
}

LayoutManager.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

LayoutManager.defaultProps = {
  children: ((
    <LayoutElement
      name="root"
      flexDirection={yoga.FLEX_DIRECTION_COLUMN}
      bBoxHandler={(bBoxes, node) => {
                  node.setWidth(bBoxes.root.width);
                  node.setHeight(bBoxes.root.height);
              }}
    >
      <LayoutElement name="top" flexGrow={1} flexDirection={yoga.FLEX_DIRECTION_ROW} >
        <LayoutElement
          name="top-left"
          bBoxHandler={(bBoxes, node) => {
                  node.setWidth(bBoxes['top-left'] ? bBoxes['top-left'].width : 0);
              }}
        />
        <LayoutElement name="top-right" flexGrow={1} />
      </LayoutElement>
      <LayoutElement name="bottom" flexDirection={yoga.FLEX_DIRECTION_ROW} >
        <LayoutElement
          name="bottom-left"
          bBoxHandler={(bBoxes, node) => {
                  node.setWidth(bBoxes['top-left'] ? bBoxes['top-left'].width : 0);
              }}
        />
        <LayoutElement
          name="bottom-right"
          flexGrow={1}
          bBoxHandler={(bBoxes, node) => {
                  node.setHeight(bBoxes['bottom-right'] ? bBoxes['bottom-right'].height : 0);
              }}
        />
      </LayoutElement>
    </LayoutElement>)),
};
