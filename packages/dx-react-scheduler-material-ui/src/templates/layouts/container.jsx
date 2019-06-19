import * as React from 'react';
import * as PropTypes from 'prop-types';

const makeScrollingAPI = (layoutElement) => {
  const changeVerticalScroll = (value) => {
    // eslint-disable-next-line no-param-reassign
    layoutElement.scrollTop += value;
  };

  const top = layoutElement.offsetTop;
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

    this.setScrollApi = this.setScrollApi.bind(this);
  }

  setScrollApi(scrollableElement) {
    const { setScrollingAPI } = this.props;

    const scrollingAPI = makeScrollingAPI(scrollableElement);
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
        setScrollApi={this.setScrollApi}
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
  // setLayoutElements: PropTypes.func.isRequired,
  setScrollingAPI: PropTypes.func.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
