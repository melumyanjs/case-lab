class TodoView{
    constructor(root, signatures) {
        this.app = this.getElement(root)
        this.signatures = signatures
    
        this.header = this.createElement('div')
        this.header.classList.add('header')
        this.title = this.createElement('h1')
        this.title.textContent = this.signatures.title || 'Todos'
        this.header.append(this.title)

        this.form = this.createElement('div', 'toolbar')
        this.input = this.createElement('input')
        this.input.type = 'text'
        this.input.placeholder = this.signatures.placeholder || 'Add todo'
        this.input.name = 'todo'
        this.submitButton = this.createElement('button')
        this.submitButton.textContent = this.signatures.textAddBtn || 'Submit'
        this.form.append(this.input, this.submitButton)

        this.subbar = this.createElement('div', 'subbar')
        this.oddBtn = this.createElement('button')
        this.oddBtn.textContent = this.signatures.textOddBtn || 'Odd'
        this.evenBtn = this.createElement('button')
        this.evenBtn.textContent = this.signatures.textEvenBtn || 'Even'
        this.shiftBtn = this.createElement('button')
        this.shiftBtn.textContent = this.signatures.textShiftBtn || 'Shift'
        this.popBtn = this.createElement('button')
        this.popBtn.textContent = this.signatures.textPopBtn || 'Pop'
        this.subbar.append(this.oddBtn, this.evenBtn, this.shiftBtn, this.popBtn)

        this.todoList = this.createElement('ul', 'todo-list')
                
        this.completedTask = this.createElement('div')
        this.completedTaskTitle = this.createElement('h3')
        this.completedTaskTitle.textContent = this.signatures.completedTitle || 'Completed'
        this.completedTodoList = this.createElement('ul', 'complated-list')
        this.completedTask.append(this.completedTaskTitle, this.completedTodoList)
        
        this.app.append(this.header, this.form, this.subbar,  this.todoList, this.completedTask)    

        this._temporaryTodoText = ''
        this._initLocalListeners()
  }

  _todoText = () => this.input.value
  
  _resetInput = () => this.input.value = ''
  
  getElement = (selector) => document.querySelector(selector)
  
  createElement(tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)
    return element
  }

  deleteAllNodes(){
    while (this.todoList.firstChild) {
        this.todoList.removeChild(this.todoList.firstChild)
    }
    while (this.completedTodoList.firstChild) {
        this.completedTodoList.removeChild(this.completedTodoList.firstChild)
    }
  }

  showDefaulMessage(msg) {
    const p = this.createElement('p')
    p.textContent = msg
    this.todoList.append(p)
  }

  createNodes(todos){
    todos.forEach(todo => {
        const li = this.createElement('li')
        li.id = todo.id

        const checkbox = this.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = todo.complete

        const span = this.createElement('span')
        span.contentEditable = true
        span.classList.add('editable')

        if (todo.complete) {
          const strike = this.createElement('s')
          strike.textContent = todo.text
          span.append(strike)
        } else {
          span.textContent = todo.text
        }

        const deleteButton = this.createElement('button', 'delete')
        deleteButton.textContent = this.signatures.textDeleteBtn || 'Delete'

        li.append(checkbox, span, deleteButton)

        if(todo.complete)
            this.completedTodoList.append(li)
        else
            this.todoList.append(li)
      })
  }

  display(todos) {
    this.deleteAllNodes()
    if (todos.length)
        this.createNodes(todos)
    else
        this.showDefaulMessage(this.signatures.defaultMsg || 'Nothing to do! Add a task?')    
  }

  _initLocalListeners() {
    this.todoList.addEventListener('input', event => {
      if (event.target.className === 'editable') {
        this._temporaryTodoText = event.target.innerText
      }
    })
    this.completedTodoList.addEventListener('input', event => {
        if (event.target.className === 'editable') {
          this._temporaryTodoText = event.target.innerText
        }
    })
    this.oddBtn.addEventListener('click', event => {
        this.todoList.classList.toggle('odd')
    })
    this.evenBtn.addEventListener('click', event => {
        this.todoList.classList.toggle('even')
    })
  }

  bindAdd(handler) {
    this.submitButton.addEventListener('click', event => {  
      if (this._todoText()) {
        handler(this._todoText())
        this._resetInput()
      }
    })
  }

  bindDelete(handler) {
    this.todoList.addEventListener('click', event => {
      if (event.target.className === 'delete') {
        const id = parseInt(event.target.parentElement.id)
        handler(id)
      }
    })
    this.completedTodoList.addEventListener('click', event => {
        if (event.target.className === 'delete') {
          const id = parseInt(event.target.parentElement.id)
          handler(id)
        }
      }) 
  }

  bindEdit(handler) {
    this.todoList.addEventListener('focusout', event => {
      if (this._temporaryTodoText) {
        const id = parseInt(event.target.parentElement.id)
        handler(id, this._temporaryTodoText)
        this._temporaryTodoText = ''
      }
    })
    this.completedTodoList.addEventListener('focusout', event => {
        if (this._temporaryTodoText) {
          const id = parseInt(event.target.parentElement.id)
          handler(id, this._temporaryTodoText)
          this._temporaryTodoText = ''
        }
      })
  }

  bindToggle(handler) {
    this.todoList.addEventListener('change', event => {
      if (event.target.type === 'checkbox') {
        const id = parseInt(event.target.parentElement.id)
        handler(id)
      }
    })
    this.completedTodoList.addEventListener('change', event => {
        if (event.target.type === 'checkbox') {
          const id = parseInt(event.target.parentElement.id)
          handler(id)
        }
      })
  }

  bindShift(handler) {
    this.shiftBtn.addEventListener('click', event => {
        handler()
    })
  }

  bindPop(handler) {
    this.popBtn.addEventListener('click', event => {
        handler()
    })
  }
}