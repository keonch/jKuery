import DOMNodeCollection from './dom_node_collection';

function $k(selector) {
  if (typeof selector === 'string') {
    const nodeList = document.querySelectorAll(selector);
    if (nodeList.length === 0) then throw "Could not find element in document";
    return new DOMNodeCollection(Array.from(nodeList));

  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection(selector);

  } else {
    throw "Argument is not a CSS selector nor an HTMLElement";
  }
}

window.$k = $k;
