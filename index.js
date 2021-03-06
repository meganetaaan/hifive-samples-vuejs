(function() {
  const TODO_FILTER = {
    ALL: Symbol('ALL'),
    ACTIVE: Symbol('ACTIVE'),
    COMPLETED: Symbol('COMPLETED')
  }
  document.addEventListener('DOMContentLoaded', function() {
    h5.core.controller('#app', {
      // controller property
      __name: 'sample.VueController',

      // private property
      _vm: null,
      _data: {
        listName: 'TODO',
        list: [{
          title: 'hoge',
          done: false
        }, {
          title: 'fuga',
          done: false
        }, {
          title: 'piyo',
          done: false
        }
      ],
        mode: TODO_FILTER.ALL
      },

      // lifetime method
      __construct() {
        this._bindView();
      },
      __ready() {},

      // public method
      addTodo (title) {
        this._data.list.push({
          title,
          done: false
        });
      },

      removeTodo (idx) {
        this._data.list.splice(idx, 1)
      },

      toggleTodo (idx) {
        this._data.list[idx].done = !this._data.list[idx].done
      },

      toggleAll () {
        const isAnyLeft = this._vm.count !== this._vm.leftCount // access computed
        this._data.list.forEach((i) => {i.done = !isAnyLeft})
      },

      setFilter (mode) {
        this._data.mode = mode;
      },

      // event handler
      '.todo-form submit' (context, $el) {
        context.event.preventDefault()
        const $titleInput = $el.find('.title')
        const title = $titleInput.val()
        this.addTodo(title)
        $titleInput.val('')
      },

      '.remove-button click' (_, $el) {
        const idx = $el.data('h5-index')
        this.removeTodo(idx)
      },

      '.done-button click' (_, $el) {
        const idx = $el.data('h5-index')
        this.toggleTodo(idx)
      },

      '.toggle-all-button click' () {
        this.toggleAll()
      },

      '.set-filter-button click' (_, $el) {
        const modeKey = $el.val()
        this.setFilter(TODO_FILTER[modeKey])
      },

      // private method
      _bindView() {
        this._vm = new Vue({
          el: this.$find('#vueRoot').get(0),
          template: `
        <div>
        <h1>{{listName}}</h1>
        <form class="todo-form">
          <input type="text" class="title" />
          <input type="submit" class="add-button" value="add" />
        </form>
        {{leftCount}} items left.
          <input type="button" class="set-filter-button" value="ALL" />
          <input type="button" class="set-filter-button" value="ACTIVE" />
          <input type="button" class="set-filter-button" value="COMPLETED" />
          <input type="button" class="toggle-all-button" value="toggle all" />
          <ul>
            <li v-for="(item, index) of filteredList" class="list-item">
              <span class="done-button" :data-h5-index="index">[{{item.done ? '✓' : '　'}}]</span>
              <span>
                <s v-if="item.done">{{item.title}}</s>
                <template v-else>{{item.title}}</template>
              </span>
              <span class="remove-button" :data-h5-index="index">☓</span>
            </li>
          </ul>
        </div>
        `,
          data: this._data,
          computed: {
            count() {
              return this.list.length;
            },
            leftCount () {
              return this.list.filter((i) => {return !i.done}).length
            },
            filteredList () {
              switch (this.mode) {
                case TODO_FILTER.ALL:
                  return this.list
                case TODO_FILTER.ACTIVE:
                  return this.list.filter((i) => {return !i.done})
                case TODO_FILTER.COMPLETED:
                  return this.list.filter((i) => {return i.done})
              }
            }
          }
        });
      }
    });
  });
})();
