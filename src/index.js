export default {
  install(Vue) {
    
    function replaceAll(str, search, replacement) {
      return str.split(search).join(replacement);
    };
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
        };
        if(!modifiers.dangerousHTML){
          el.addEventListener('paste', function (ev) {
            ev.preventDefault();
            let text = (ev.originalEvent || ev).clipboardData.getData('text/plain');
            if(modifiers.preventNL) {
              text = replaceAll(text, '\r\n', ' ')
              text = replaceAll(text, '\n', ' ')
              text = replaceAll(text, '\r', ' ')
            }
            window.document.execCommand('insertText', false, text);
          });
        }
        if(modifiers.preventNL) {
          el.addEventListener('keypress', function (ev) {
            if(ev.key == 'Enter') {
              ev.preventDefault();
            }
          });
        }
        
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
