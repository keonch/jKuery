import DOMNodeCollection from './dom_node_collection';

const _callbacks = [];

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
      if (document.readyState !== "complete") _callbacks.push(selector);
      break;

    default:
      throw "Invalid argument"
  }
}

$k.extend = function(obj, ...objs) {
  objs.forEach((object) => {
    Object.keys(object).forEach(key => obj[key] = object[key]);
  });
  return obj;
}

$k.ajax = function(settings) {
  const defaultSettings = {
    method: 'GET',
    url: '',
    data: {},
    success: (response) => response,
    error: (response) => response,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: true
  }
  if (settings.type) defaultSettings.method = settings.type;
  settings = $k.extend(defaultSettings, settings);

  return new Promise(() => {
    const xhr = new XMLHttpRequest();
    xhr.open(settings.method.toUpperCase(), settings.url, settings.async);
    xhr.onload = () => settings.success(xhr.response);
    xhr.onerror = () => settings.error(xhr.statusText);
    xhr.send(JSON.stringify(settings.data));
  });

  // const xhr = new XMLHttpRequest();
  // xhr.open(settings.method.toUpperCase(), settings.url, settings.async);
  // xhr.onload = function() {
  //   xhr.status === 200 ? settings.success(xhr.response) : settings.error(xhr.response);
  // };
  // xhr.send(JSON.stringify(settings.data));
}

document.addEventListener('DOMContentLoaded', () => {
  _callbacks.forEach(callback => callback());
})

export default $k;

window.$k = $k;
