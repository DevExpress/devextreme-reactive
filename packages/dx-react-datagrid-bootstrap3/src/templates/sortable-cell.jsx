import React from 'react';

export const SortableCell = ({ direction, changeDirection, children }) => {
  let iconName = '';
  if (direction) {
    iconName = `glyphicon glyphicon-arrow-${direction === 'asc' ? 'down' : 'up'}`;
  }
  return (
    <div
      onClick={e => changeDirection({ keepOther: e.shiftKey })}
      style={{ width: '100%', height: '100%' }}
    >
      <div
        style={{
          float: 'right',
          width: '30px',
          textAlign: 'right',
        }}
      ><i className={`glyphicon ${iconName}`} style={{ float: 'right' }} /></div>
      <div
        style={{
          paddingRight: '30px',
        }}
      >{children}</div>
    </div>
  );
};

SortableCell.propTypes = {
  direction: React.PropTypes.any.isRequired,
  changeDirection: React.PropTypes.func.isRequired,
  children: React.PropTypes.any.isRequired,
};
