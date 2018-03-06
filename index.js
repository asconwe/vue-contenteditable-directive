const contenteditable = {
  install(Vue) {
    Vue.directive("contenteditable", {
      bind(el, { arg, value, expression, modifiers }, vnode) {
        const innerValue = modifiers.dangerousHTML ? "innerHTML" : "innerText";
        if (arg) {
          el.contentEditable = value;
        } else {
          el.contentEditable = true;
        }
        const key = arg || expression;
        el.oninput = function(event) {
          vnode.context[key] = event.target[innerValue];
          el.dataset.comparison = event.target[innerValue];
        };
        el.onblur = function(event) {
          el[innerValue] = el.dataset[key];
          console.log({ el });
        };
        el.dataset[key] = vnode.context[key];
        el[innerValue] = vnode.context[key];
        return;
      },
      componentUpdated: function(
        el,
        { arg, modifiers, value, expression },
        vnode
      ) {
        const innerValue = modifiers.dangerousHTML ? "innerHTML" : "innerText";
        if (arg) {
          el.contentEditable = value;
        } else {
          el.contentEditable = true;
        }
        const key = arg || expression;
        const val = vnode.context[key];
        el.dataset[key] = val;
        if (val !== el.dataset.comparison) {
          el[innerValue] = val;
        }
        return;
      }
    });
  }
};

export default contenteditable;
