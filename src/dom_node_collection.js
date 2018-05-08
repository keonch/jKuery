export default class DOMNodeCollection {
  constructor(HTMLelements) {
    this.elements = HTMLelements;
  }

  html(htmlString) {
    switch (typeof htmlString) {
      case "string":
        this.elements.forEach(element => element.innerHTML = htmlString);
        break;
      case "undefined":
        return this.elements[0].innerHTML;
      default:
        throw "Invalid Argument";
    }
  }

  empty() {
    this.html('');
  }

  append(content) {
    switch (typeof content) {
      case "string":
        this.elements.forEach(element => element.innerHTML += content);
        break;
      case "object":
        if (!(content instanceof DOMNodeCollection)) content = $k(content);
        this.elements.forEach((parentElement) => {
          content.elements.forEach((childElement) => {
            parentElement.appendChild(childElement.cloneNode(true));
          });
        });
        break;
      default:
        throw "Invalid argument";
    }
  }
}
