import DOMNodeCollection from './dom_node_collection';

function $k(selector) {
  switch (typeof selector) {
    case "string":
      const nodeList = document.querySelectorAll(selector);
      if (nodeList.length === 0) throw "Could not find element in document";
      return new DOMNodeCollection(Array.from(nodeList));

    case "object":
      if (selector instanceof HTMLElement) {
        return new DOMNodeCollection([selector]);
      } else {
        throw "Invalid argument"
      }

    default:
      throw "Invalid argument"
  }
}

window.$k = $k;
