import React from 'react';
import PropTypes from 'prop-types';

const emitter = () => {
  const subscriptions = [];

  return {
    emit: (e) => { subscriptions.forEach(subscription => subscription(e)); },
    subscribe: subscription => subscriptions.push(subscription),
    unsubscribe: subscription => subscriptions.splice(subscriptions.indexOf(subscription), 1),
  };
};

class DragDropContextCore {
  constructor() {
    this.data = null;
    this.dragEmitter = emitter();
  }
  start(data, clientOffset) {
    this.data = data;
    this.dragEmitter.emit({ data: this.data, clientOffset });
  }
  update(clientOffset) {
    this.dragEmitter.emit({ data: this.data, clientOffset });
  }
  end() {
    this.data = null;
    this.dragEmitter.emit({ data: this.data, drop: true, clientOffset: null });
  }
}

export class DragDropContext extends React.Component {
  constructor(props) {
    super(props);

    this.dragDropContext = new DragDropContextCore();

    this.dragDropContext.dragEmitter.subscribe(({ data, clientOffset }) => {
      this.props.onChange({ data, clientOffset });
    });
  }
  getChildContext() {
    return {
      dragDropContext: this.dragDropContext,
    };
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children;
  }
  render() {
    return this.props.children;
  }
}

DragDropContext.childContextTypes = {
  dragDropContext: PropTypes.shape().isRequired,
};

DragDropContext.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
};

DragDropContext.defaultProps = {
  onChange: () => {},
};
