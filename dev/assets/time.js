(function() {
  var importDoc = document.currentScript.ownerDocument;

  window.customElements.define('spring-time', class extends HTMLElement {
    constructor() {
      super();
      this.root = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
      var my = this;
      
      my.options = {
        startDate: my.hasAttribute('data-start-date') ? new Date(my.getAttribute('data-start-date')) : new Date(),
        monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
      };

      my.render();
    }

    render() {
      var my = this;
      var template = importDoc.querySelector('#spring-clock');
      var clone = document.importNode(template.content, true);
      var container = document.createElement('div');
      var date = document.createElement('div');
      var time = document.createElement('div');

      clone.appendChild(container);
      my.root.appendChild(clone);
    }
  });
})();