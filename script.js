'use strict'

function DomElement(selector, height, width, bg, fontSize) {
   this.selector = selector;
   this.height = height;
   this.width = width;
   this.bg = bg;
   this.fontSize = fontSize;

};

DomElement.prototype.createClassOrId = function(selector, height, width, bg, fontSize) {
   let anyText = prompt('Введите любой текст:', 'anytext');

   if (selector.startsWith('.')) {
      document.body.innerHTML = `<div>` + anyText + `</div>`;
      let getElem = document.querySelector('div');
      getElem.classList.add(selector.slice(1))
      let getElemClass = document.querySelector(`.${selector.slice(1)}`);
      getElemClass.style.height = height;
      getElemClass.style.width = width;
      getElemClass.style.backgroundColor = bg;
      getElemClass.style.fontSize = fontSize;
   } else if (selector.startsWith('#')) {
      document.body.innerHTML = `<p>` + anyText + `</p>`;
      let getElem = document.querySelector('p');
      getElem.id = selector.slice(1);
      let getElemId = document.querySelector(`#${selector.slice(1)}`);
      getElemId.style.height = height;
      getElemId.style.width = width;
      getElemId.style.backgroundColor = bg;
      getElemId.style.fontSize = fontSize;

   }
};

let newObj = new DomElement('.path1', '10px', '200px', 'red', '16px');

newObj.createClassOrId('#path1', '50px', '200px', 'red', '16px');

console.log(newObj);







