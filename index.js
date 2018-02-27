const contenteditable = {
  install(Vue) {
    Vue.directive("contenteditable", {
      bind(el, { expression }, vnode) {
        el.contentEditable = true;
        el.oninput = function(event) {
          vnode.context[expression] = event.target.innerText;
          el.dataset.comparison = event.target.innerText;
        };
        el.onblur = function(event) {
          el.innerText = el.dataset.message;
        };
      },
      componentUpdated: function(el, { expression }, vnode) {
        const message = vnode.context[expression];
        el.dataset[expression] = message;
        if (el.dataset[expression] !== el.dataset.comparison) {
          el.innerText = vnode.context[expression];
        }
      }
    });
  }
};

export default contenteditable;