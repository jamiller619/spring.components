(function() {
  var importDoc = document.currentScript.ownerDocument;

  window.customElements.define('spring-clock', class extends HTMLElement {
    constructor() {
      super();
      this.root = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
      var my = this;
      my.options = {
        size: my.hasAttribute('data-size') ? +my.getAttribute('data-size') : 33,
        sizeUnits: my.hasAttribute('data-size-unit') ? my.getAttribute('data-size-unit') : 'vmin',
        startDate: my.hasAttribute('data-start-date') ? new Date(my.getAttribute('data-start-date')) : new Date(),
        speed: my.hasAttribute('data-speed') ? +my.getAttribute('data-speed') : 1,
        colors: {
          minute: my.hasAttribute('data-color-minute') ? my.getAttribute('data-color-minute') : '#f12177',
          hour: my.hasAttribute('data-color-hour') ? my.getAttribute('data-color-hour') : '#ad00e9'
        }
      };

      my.render();
    }

    render() {
      var my = this;
      var template = importDoc.querySelector('#spring-clock');
      var clone = document.importNode(template.content, true);
      var container = document.createElement('div');
      var minutesContainer = document.createElement('div');
      var minutes = document.createElement('div');
      var minuteHandContainer = document.createElement('div');
      var minuteHand = document.createElement('div');
      var hoursContainer = document.createElement('div');
      var hours = document.createElement('div');
      var dial = document.createElement('div');
      var face = document.createElement('div');
      var degrees = my.getDegrees(my.options.startDate);
      
      minutes.className = 'minutes';
      minuteHand.className = 'minute-hand';
      hours.className = 'hours';
      minutesContainer.className = 'minutes-container';
      hoursContainer.className = 'hours-container';
      minuteHandContainer.className = 'minute-hand-container';
      dial.className = 'dial';
      face.className = 'face';

      minutesContainer.style.transform = minuteHandContainer.style.transform = 'rotate(' + (degrees.minute - 180) + 'deg)';
      hoursContainer.style.transform = 'rotate(' + (degrees.hour - 180) + 'deg)';

      minutes.style.backgroundColor = minuteHand.style.backgroundColor = my.options.colors.minute;
      hours.style.backgroundColor = my.options.colors.hour;

      face.appendChild(my.createMarkers());

      minutesContainer.appendChild(minutes);
      minuteHandContainer.appendChild(minuteHand);
      hoursContainer.appendChild(hours);

      container.appendChild(face);
      container.appendChild(dial);
      container.appendChild(hoursContainer);
      container.appendChild(minutesContainer);
      container.appendChild(minuteHandContainer);

      container.className = 'spring-clock';
      container.style.width = container.style.height = my.options.size + my.options.sizeUnits;

      clone.appendChild(container);
      my.root.appendChild(clone);

      window.setTimeout(function() {
        minutesContainer.style.transform = minuteHandContainer.style.transform = 'rotate(' + degrees.minute + 'deg)';
        hoursContainer.style.transform = 'rotate(' + degrees.hour + 'deg)';
      }, 10);
    }

    createMarkers() {
      var i = 0, l = 12, el, markers = document.createDocumentFragment();
      for(; i < l; i++) {
        el = document.createElement('div');
        el.className = 'marker';
        el.style.transform = 'rotate(' + (i * 360 / 12) + 'deg) translate(' + (this.options.size / 2 * .75) + this.options.sizeUnits + ')';
        markers.appendChild(el);
      }
      return markers;
    }

    getDegrees(date) {
      var d = date || new Date();
      var minutes = (d.getSeconds() / 60 + d.getMinutes()) / 60;
      var hours = (d.getHours() + d.getMinutes() / 60) / 12;
      return {
        minute: (minutes * 360) % 360,
        hour: (hours * 360) % 360
      };
    }
  });
})();