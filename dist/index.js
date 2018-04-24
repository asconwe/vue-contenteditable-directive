(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global['vue-contenteditable-directive'] = factory());
}(this, (function () { 'use strict';

  var index = {
    install: function install(Vue) {
      Vue.directive("contenteditable", {
        bind: function bind(el, _ref, vnode) {
          var arg = _ref.arg,
              value = _ref.value,
              expression = _ref.expression,
              modifiers = _ref.modifiers;

          var innerValue = modifiers.dangerousHTML ? "innerHTML" : "innerText";
          if (arg) {
            el.contentEditable = value;
          } else {
            el.contentEditable = true;
          }
          var key = arg || expression;
          el.oninput = function (event) {
            vnode.context[key] = event.target[innerValue];
            el.dataset.comparison = event.target[innerValue];
          };
          el.onblur = function (event) {
            el[innerValue] = el.dataset[key];
          };
          el.dataset[key] = vnode.context[key];
          el[innerValue] = vnode.context[key];
          return;
        },

        componentUpdated: function componentUpdated(el, _ref2, vnode) {
          var arg = _ref2.arg,
              modifiers = _ref2.modifiers,
              value = _ref2.value,
              expression = _ref2.expression;

          var innerValue = modifiers.dangerousHTML ? "innerHTML" : "innerText";
          if (arg) {
            el.contentEditable = value;
          } else {
            el.contentEditable = true;
          }
          var key = arg || expression;
          var val = vnode.context[key];
          el.dataset[key] = val;
          if (val !== el.dataset.comparison) {
            el[innerValue] = val;
          }
          return;
        }
      });
    }
  };

  return index;

})));
