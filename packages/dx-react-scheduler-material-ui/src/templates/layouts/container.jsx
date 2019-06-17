import * as React from 'react';
import * as PropTypes from 'prop-types';

const makeScrollingAPI = (layoutElement, layoutHeaderElement) => {
  const changeVerticalScroll = (value) => {
    // eslint-disable-next-line no-param-reassign
    layoutElement.scrollTop += value;
  };

  const layoutHeaderRect = layoutHeaderElement.getBoundingClientRect();
  const top = layoutHeaderRect.height + layoutHeaderRect.top;
  const bottom = layoutElement.offsetTop + layoutElement.clientHeight;

  return {
    top,
    bottom,
    changeVerticalScroll,
  };
};

export class LayoutContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.layout = React.createRef();
    this.layoutHeader = React.createRef();
  }

  componentDidMount() {
    this.setCells();
  }

  componentDidUpdate() {
    this.setCells();
  }

  setCells() {
    const { setLayoutElements, setScrollingAPI } = this.props;

    // TODO: make scrolling API here
    const layoutElement = this.layout.current;
    const layoutHeaderElement = this.layoutHeader.current;

    setLayoutElements(layoutElement, layoutHeaderElement);

    const scrollingAPI = makeScrollingAPI(layoutElement, layoutHeaderElement);
    setScrollingAPI(scrollingAPI);
  }

  render() {
    const {
      layoutComponent: Layout,
      timeScaleComponent,
      dayScaleComponent,
      timeTableComponent,
      dayScaleEmptyCellComponent,
      height,
    } = this.props;

    return (
      <Layout
        layoutRef={this.layout}
        layoutHeaderRef={this.layoutHeader}
        timeScaleComponent={timeScaleComponent}
        dayScaleComponent={dayScaleComponent}
        timeTableComponent={timeTableComponent}
        dayScaleEmptyCellComponent={dayScaleEmptyCellComponent}
        height={height}
      />
    );
  }
}

LayoutContainer.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  timeScaleComponent: PropTypes.func.isRequired,
  dayScaleComponent: PropTypes.func.isRequired,
  timeTableComponent: PropTypes.func.isRequired,
  dayScaleEmptyCellComponent: PropTypes.func.isRequired,
  setLayoutElements: PropTypes.func.isRequired,
  setScrollingAPI: PropTypes.func.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
