export const createRenderComponent = (Component, initialAdditionalProps) => {
  let storedAdditionalProps = initialAdditionalProps;
  const components = new Set();

  const RenderComponent = {
    name: 'RenderComponent',
    beforeMount() {
      components.add(this);
    },
    beforeDestroy() {
      components.delete(this);
    },
    render() {
      return (
        <Component
          {...{ attrs: { ...this.$attrs, ...storedAdditionalProps }, on: { ...this.$listeners } }}
        />
      );
    },
  };

  return {
    component: RenderComponent,
    update: (additionalProps) => {
      storedAdditionalProps = additionalProps;
      Array.from(components.values())
        .forEach(component => component.$forceUpdate());
    },
  };
};

// export const createRenderComponent = (Component, initialAdditionalProps) => {
//   let storedAdditionalProps = initialAdditionalProps;
//   const components = new Set();
//   class RenderComponent extends React.Component {
//     componentWillMount() {
//       components.add(this);
//     }
//     componentWillUnmount() {
//       components.delete(this);
//     }
//     render() {
//       return <Component {...this.props} {...storedAdditionalProps} />;
//     }
//   }
//   return {
//     component: RenderComponent,
//     update: (additionalProps) => {
//       storedAdditionalProps = additionalProps;
//       Array.from(components.values())
//         .forEach(component => component.forceUpdate());
//     },
//   };
// };
