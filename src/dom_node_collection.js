export default class DOMNodeCollection {
  constructor(HTMLelements) {
    this.elements = HTMLelements;
  }

  each(callback) {
    this.elements.forEach(callback);
  }

  html(htmlString) {
    switch (typeof htmlString) {
      case "string":
        this.each(element => element.innerHTML = htmlString);
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
        this.each(element => element.innerHTML += content);
        break;
      case "object":
        if (!(content instanceof DOMNodeCollection)) content = $k(content);
        this.each((parentElement) => {
          content.each((childElement) => {
            parentElement.appendChild(childElement.cloneNode(true));
          });
        });
        break;
      default:
        throw "Invalid argument";
    }
  }

  attr(attributeName, value) {
    switch (typeof value) {
      case "undefined":
        return this.elements[0].getAttribute(attributeName);
      case "string":
        this.each(element => element.setAttribute(attributeName, value));
    }
  }

  addClass(className) {
    this.each(element => element.classList.add(className));
  }
}
