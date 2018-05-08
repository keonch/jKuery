export default class DOMNodeCollection {
  constructor(HTMLelements) {
    this.elements = HTMLelements;
  }

  html(htmlString) {
    if (typeof htmlString === 'undefined') {
      return this.elements[0].innerHTML;
    } else if (typeof htmlString === 'string') {
      this.elements.forEach(node => node.innerHTML = htmlString);
      return htmlString;
    } else {
      throw "Argument is not valid";
    }
  }

  empty() {
    this.html('');
  }
}
