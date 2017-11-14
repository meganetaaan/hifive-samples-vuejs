document.addEventListener("DOMContentLoaded", function() {
  h5.core.controller("#app", {
    __name: "sample.VueController",
    _data: {
      message: "hello world",
      count: 0,
      list: []
    },
    __construct() {
      this._component = new Vue({
        el: this.$find("#vueRoot").get(0),
        template: `
        <div>
        <input type="button" id="hello" value="add" />
        {{message}}{{length}}
          <ul>
            <li v-for="item of list">{{item}}</li>
          </ul>
        </div>
        `,
        data: this._data,
        computed: {
          length () {
            return this.list.length
          }
        }
      });
    },
    __ready() {},
    "#hello click": function() {
      this._data.count++;
      this._data.list.push(`hello world ${this._data.count}`);
    }
  });
});