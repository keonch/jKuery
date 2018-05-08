import DOMNodeCollection from './dom_node_collection';

function $k(selector) {
  const nodeList = document.querySelectorAll(selector);
  const elements = Array.from(nodeList);
  return new DOMNodeCollection(elements);
}

window.$k = $k;
