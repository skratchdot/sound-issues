GSAP

DRAGGABLE is if updates and the bug: toLowerCAse of undefined tritt auf change:

_addListener = function(element, type, func, capture) {
  if (element.addEventListener) {
    element.addEventListener(_touchEventLookup[type] || type, func, capture); // <<< THIS
    if (type !== _touchEventLookup[type]) { //some browsers actually support both, so must we.
      element.addEventListener(type, func, capture);
    }
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, func);
  }
},

_removeListener = function(element, type, func) {
  if (element.removeEventListener) {
    element.removeEventListener(_touchEventLookup[type] || type, func); // <<< THIS
    if (type !== _touchEventLookup[type]) {
      element.removeEventListener(type, func);
    }
  } else if (element.detachEvent) {
    element.detachEvent("on" + type, func);
  }
},


Draggable Wenn er ohne error aufhört das wheel zu drehen:

Er hat ein problem damit, wenn die Komponenten in Vue geupdatet werden! durch den State z.B.
