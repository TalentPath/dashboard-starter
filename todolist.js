class ToDoList {

    //toDoListPane = document.querySelector('.pane3');
    constructor(){}

    render() {
        let toDoListForm = document.querySelector(".form");
        //console.log('todolistform', toDoListForm);
        // Do something when form is submitted
        const todosUl = document.querySelector('#todos');
        toDoListForm.addEventListener("submit", (ev) => {
            ev.preventDefault();
            let todo = document.querySelector('#todo').value;
            let todoLi = document.createElement('li');
            todoLi.innerHTML = `${todo} <button class="delete">Remove</button>`;
            todosUl.appendChild(todoLi);
            document.getElementById("todo").value = ''
        });

        document.body.addEventListener('click', event => {
            // console.log(event);
            // console.log(event.target);

            if (event.target.className === 'delete') {
                let li = event.target.parentNode;
                li.remove();
            }

        })
    }

}

export default ToDoList