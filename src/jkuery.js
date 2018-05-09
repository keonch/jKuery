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

    case "function":
      const callbacks = [];
      callbacks.push(selector)
      // signal when document is ready
      // callbacks.forEach(callback => callback());

    default:
      throw "Invalid argument"
  }
}

function extend(...obj) {
  arguments(obj).forEach((arg) =>)
}

window.$k = $k;

export default $k;
