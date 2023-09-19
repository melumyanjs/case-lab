class TodoApp {
    constructor(root){
        this.root = root
    }

    start() {
        new TodoController(
            new TodoModel(), 
            new TodoView(this.root, {
                placeholder: 'Введите задачу',
                textAddBtn: 'Добавить',
                textDeleteBtn: 'Удалить',
                title: 'Список дел',
                defaultMsg: 'Нечего делать? Добавьте задачу!',
                completedTitle: 'Выполненые задачи',
                textShiftBtn: 'Удалить первую задачу',
                textPopBtn: 'Удалить последнюю задачу',
                textOddBtn: 'Выбрать нечетные',
                textEvenBtn: 'Выбрать четные'
            })
        ).handleShow()
    }
}

// =======================
function main() {
    new TodoApp('#app').start()
}

main()