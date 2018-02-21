import Vue from 'vue';
import { PluginHost } from './plugin-host';
import { Template } from './template';

describe('Template', () => {
  it('should be rendered', () => {
    const Constructor = Vue.extend({
      render() {
        return (
          <PluginHost>
            <Template name="root">
              <h1>Template content</h1>
            </Template>
          </PluginHost>
        );
      },
    });
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('h1').textContent)
      .toEqual('Template content');
  });

  it('should be rendered depending on predicate', () => {
    const Constructor = Vue.extend({
      render() {
        return (
          <PluginHost>
            <Template name="root" predicate={() => false}>
              <h1>Template content</h1>
            </Template>
          </PluginHost>
        );
      },
    });
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('h1'))
      .toEqual(null);
  });

  // fit('should be rerendered when content changes', () => {
  //   const Test = {
  //     props: {
  //       text: {},
  //     },
  //     render() {
  //       return (
  //         <PluginHost>
  //           <Template name="root">
  //             <h1>{this.text}</h1>
  //           </Template>
  //         </PluginHost>
  //       );
  //     },
  //   };
  //   const Constructor = Vue.extend({
  //     data() {
  //       return {
  //         text: 'test',
  //       };
  //     },
  //     render() {
  //       return (
  //         <Test text={this.text} />
  //       );
  //     },
  //   });
  //   const vm = new Constructor().$mount();
  //   vm.$set(vm, 'text', 'new');
  //   vm.$mount();
  //   expect(vm.$el.querySelector('h1').textContent)
  //     .toEqual('new');
  // });
});
