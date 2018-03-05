const contenteditable = {
  install(Vue) {
    Vue.directive("contenteditable", {
      bind(el, { arg, value, expression, modifiers }, vnode) {
        if (arg) {
          el.contentEditable = value;
        } else {
          el.contentEditable = true;
        }
        const key = arg || expression;
        el.oninput = function(event) {
          vnode.context[key] = event.target.innerText;
          el.dataset.comparison = event.target.innerText;
        };
        el.onblur = function(event) {
          el.innerText = el.dataset[key];
          console.log({ el });
        };
        el.dataset[key] = vnode.context[key];
        el.innerText = vnode.context[key];
        return;
      },
      componentUpdated: function(el, { arg, value, expression }, vnode) {
        if (arg) {
          el.contentEditable = value;
        } else {
          el.contentEditable = true;
        }
        const key = arg || expression;
        const val = vnode.context[key];
        el.dataset[key] = val;
        if (val !== el.dataset.comparison) {
          el.innerText = val;
        }
        return;
      }
    });
  }
};

export default contenteditable;
