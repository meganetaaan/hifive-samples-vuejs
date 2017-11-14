document.addEventListener("DOMContentLoaded", function() {
  h5.core.controller("#app", {
    __name: "sample.VueController",
    _data: {
      message: "hello world",
      count: 0
    },
    __construct() {
      this._component = new Vue({
        el: this.$find("#vueRoot").get(0),
        template: "#hello",
        data: this._data
      });
    },
    __ready() {},
    "#hello click": function() {
      this._data.count++;
    }
  });
});