class TodoModel{
    constructor() {
        this.todos =  JSON.parse(localStorage.getItem('todos')) || []
    }
    
    bindShow = (callback) => this.onTodoListChanged = callback
    
    _commit(todos) {
        this.onTodoListChanged(todos)
        localStorage.setItem('todos', JSON.stringify(todos))
    }
    
    add(todoText) {
        const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: todoText,
            complete: false,
        }
        this.todos.push(todo)
        this._commit(this.todos)
    }
  
    edit(id, updatedText) {
      this.todos = this.todos.map(todo =>
        todo.id === id ? { id: todo.id, text: updatedText, complete: todo.complete } : todo
      )
      this._commit(this.todos)
    }
  
    delete(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
      this._commit(this.todos)
    }

    pop() {
      if(this.todos.length){
        this.todos.pop()
        this._commit(this.todos)
      }
    }

    shift(){
      if(this.todos.length){
        this.todos.shift()
        this._commit(this.todos)
      }
    }
  
    toggle(id) {
      this.todos = this.todos.map(todo =>
        todo.id === id ? { id: todo.id, text: todo.text, complete: !todo.complete } : todo
      )
      this._commit(this.todos)
    }
}