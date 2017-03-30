/* global document */

import React from 'react';

function testCSSProp(property, value, noPrefixes) {
  const prop = `${property}:`;
  const el = document.createElement('test');
  const mStyle = el.style;

  if (!noPrefixes) {
    mStyle.cssText = `${prop + ['-webkit-', '-moz-', '-ms-', '-o-', ''].join(`${value};${prop}`) + value};`;
  } else {
    mStyle.cssText = prop + value;
  }
  return mStyle[property];
}
const stickyProp = testCSSProp('position', 'sticky');

function getVisibleItems(options) {
  let viewportStart = options.viewport.start;
  const viewportSize = options.viewport.size;

  const visibleItemMetas = [];
  const stickyItemsMetas = [];

  let index = 0;
  let offset = 0;
  while (index < options.itemCount) {
    const itemInfo = options.itemInfo(index);
    const itemSize = itemInfo.size;
    const itemStick = itemInfo.stick;

    if (itemStick === 'before' && offset <= viewportStart) {
      stickyItemsMetas.push({ index, offset, size: itemSize, stick: itemStick });
      viewportStart += itemSize;
    }

    if (
      (
        (offset + itemSize > viewportStart && offset + itemSize < viewportStart + viewportSize) ||
        (offset < viewportStart + viewportSize && offset > viewportStart) ||
        (offset <= viewportStart && offset + itemSize >= viewportStart + viewportSize)
      ) &&
      itemSize > 0 &&
      itemStick === false
    ) {
      visibleItemMetas.push({ index, offset, size: itemSize, stick: false });
    }

    index += 1;
    offset += itemSize;
  }

  return {
    visibleItemMetas: [...visibleItemMetas, ...stickyItemsMetas],
    fullSize: offset,
    stickyBeforeSize: stickyItemsMetas.reduce((accumulator, meta) => accumulator + meta.size, 0),
  };
}

export class VirtualBox extends React.Component {
  getChildContext() {
    const { direction, position, stick } = this.props;
    const viewport = this.context.virtualHost.viewport;

    const positionProp = direction === 'horizontal' ? 'left' : 'top';
    const crossPositionProp = direction === 'horizontal' ? 'top' : 'left';
    const sizeProp = direction === 'horizontal' ? 'width' : 'height';
    const crossSizeProp = direction === 'horizontal' ? 'height' : 'width';

    return {
      virtualHost: {
        viewport: {
          [positionProp]: stick ? position : Math.max(viewport[positionProp] - position, 0),
          [crossPositionProp]: viewport[crossPositionProp],
          [sizeProp]: stick
            ? viewport[sizeProp]
            : Math.min(
              (viewport[positionProp] + viewport[sizeProp]) - position,
              viewport[sizeProp]),
          [crossSizeProp]: viewport[crossSizeProp],
        },
      },
    };
  }
  getItemStyles({ position, size, stick }) {
    const { direction, crossSize } = this.props;
    const viewport = this.context.virtualHost.viewport;

    const positionProp = direction === 'horizontal' ? 'left' : 'top';
    const sizeProp = direction === 'horizontal' ? 'width' : 'height';
    const crossSizeProp = direction === 'vertical' ? 'width' : 'height';

    let styles = {
      position: 'absolute',
      [positionProp]: `${position}px`,
    };

    if (stick) {
      if (stickyProp) {
        styles = {
          ...styles,

          position: stickyProp,
          [positionProp]: `${position + (viewport[`${positionProp}Stick`] || 0)}px`,
        };
      } else if (direction === 'vertical') {
        styles = {
          position: 'fixed',
          [crossSizeProp]: `${viewport[crossSizeProp]}px`,
          overflow: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        };
        /* children = (
            <div
              style={{
                marginLeft: -viewport[crossPositionProp] + 'px',
                width: '100%',
                height: '100%'
              }}
            >
                {children}
            </div>
        );*/
      }
    }

    return {
      ...styles,
      display: 'block',
      [sizeProp]: `${size}px`,
      [crossSizeProp]: `${crossSize}px`,
    };
  }
  render() {
    const { direction, position, stick, iref } = this.props;
    const viewport = this.context.virtualHost.viewport;

    const positionProp = direction === 'horizontal' ? 'left' : 'top';
    const sizeProp = direction === 'horizontal' ? 'width' : 'height';

    const { visibleItemMetas, fullSize } = getVisibleItems({
      viewport: { start: stick ? position : viewport[positionProp], size: viewport[sizeProp] },
      itemCount: this.props.itemCount,
      itemInfo: this.props.itemInfo,
    });

    const visibleItems = visibleItemMetas.map((visibleItemMeta) => {
      const styles = this.getItemStyles({
        position: visibleItemMeta.offset,
        size: visibleItemMeta.size,
        stick: visibleItemMeta.stick,
      });

      return React.cloneElement(
                this.props.itemTemplate(visibleItemMeta.index, visibleItemMeta.offset),
        {
          key: `${visibleItemMeta.index}`,
          style: styles,
        },
            );
    });

    const RootTag = this.props.rootTag;

    return (
      <RootTag
        className={this.props.className}
        style={{
          position: 'relative',
          ...this.props.style,
          [sizeProp]: `${fullSize}px`,
          display: 'block',
        }}
        {...(iref ? { ref: iref } : {})}
      >
        {visibleItems}
      </RootTag>
    );
  }
}
VirtualBox.defaultProps = {
  rootTag: 'div',
  className: '',
  style: {},
  position: 0,
  stick: false,
  crossSize: 0,
  iref: undefined,
};
VirtualBox.propTypes = {
  rootTag: React.PropTypes.string,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  position: React.PropTypes.number,
  stick: React.PropTypes.bool,
  iref: React.PropTypes.func,
  crossSize: React.PropTypes.number,
  direction: React.PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  itemCount: React.PropTypes.number.isRequired,
  itemInfo: React.PropTypes.func.isRequired,
  itemTemplate: React.PropTypes.func.isRequired,
};
VirtualBox.contextTypes = {
  virtualHost: React.PropTypes.object,
};
VirtualBox.childContextTypes = {
  virtualHost: React.PropTypes.object.isRequired,
};
