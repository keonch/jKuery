function $k(selector) {
  const nodeList = document.querySelectorAll(selector);
  const elements = Array.from(nodeList);
  console.log(elements);
}

window.$k = $k;
