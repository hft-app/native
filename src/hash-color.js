import Vue from 'vue';

Vue.directive('hash-color', {
  bind(el, {value}) {
    const colors = ['green', 'blue', 'orange', 'red', 'yellow', 'teal', 'purple', 'pink'];
    let hash = 0;
    for(let i = 0; i < value.length; i++) {
      hash += value.charCodeAt(i);
    }
    hash %= colors.length;
    el.classList.add(colors[hash]);
  }
});
