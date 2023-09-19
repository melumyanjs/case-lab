class TodoController {
    constructor (model, view){
        this.model = model
        this.view = view
      
        this.model.bindShow(this.handleShow)
        this.view.bindAdd(this.handleAdd)
        this.view.bindEdit(this.handleEdit)
        this.view.bindDelete(this.handleDelete)
        this.view.bindPop(this.handlePop)
        this.view.bindShift(this.handleShift)
        this.view.bindToggle(this.handleToggle)
    }

    handleShow = (todos = this.model.todos) => this.view.display(todos)
    handleAdd = todoText => this.model.add(todoText)
    handleEdit = (id, todoText) => this.model.edit(id, todoText)
    handleDelete = id => this.model.delete(id)
    handleShift = () => this.model.shift()
    handlePop = () => this.model.pop()
    handleToggle = id => this.model.toggle(id)
}