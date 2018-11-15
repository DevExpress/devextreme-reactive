import * as React from 'react';

export const withContextToProps = (
  { Context: Context1, name: name1 }, { Context: Context2, name: name2 },
) => Component => (props) => {
debugger
  return (
    <Context1.Consumer>
      {context1 => (
        <Context2.Consumer>
          {context2 => (
            <Component {...props} {...{ [name1]: context1, [name2]: context2 }} />
          )}
        </Context2.Consumer>
      )}
    </Context1.Consumer>
  );
};
