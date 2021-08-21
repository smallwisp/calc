'use strict'

function DomElement(selector, height, width, bg, fontSize) {
   this.selector = selector;
   this.height = height;
   this.width = width;
   this.bg = bg;
   this.fontSize = fontSize;

};

DomElement.prototype.createClassOrId = function(selector) {
   if (selector.startsWith('.')) {
      let getElem = document.createElement('div');
      document.body.innerHTML = `<div></div>`;
      getElem = document.querySelector('div');
      getElem.classList.add(selector);
   } else if (selector.startsWith('#')) {
      document.body.innerHTML = `<p></p>"`
   }
};

let newObj = new DomElement();

newObj.createClassOrId('.path1', '10px', '200px', 'red', '16px');

console.log(newObj);






